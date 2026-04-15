'use client';

import { RateLimitedError } from '../rateLimit';
import { ServicePausedCandidateError } from '../servicePause';

const REQUEST_TIMEOUT_MS = 9000;
const REQUEST_TIMEOUT_MESSAGE = 'Request timed out. Please try again.';
const NETWORK_FAILURE_MESSAGE = 'Unable to reach the server. Please check the backend and try again.';
const INVALID_RESPONSE_MESSAGE = 'Received invalid server response.';

interface ApiErrorBody {
  error?: string;
  message?: string;
}

const parseRetryAfterSeconds = (value: string | null) => {
  if (!value) return undefined;

  const seconds = Number.parseInt(value, 10);
  if (Number.isFinite(seconds) && seconds > 0) return seconds;

  const retryAt = Date.parse(value);
  if (!Number.isFinite(retryAt)) return undefined;

  const deltaSeconds = Math.ceil((retryAt - Date.now()) / 1000);
  return deltaSeconds > 0 ? deltaSeconds : undefined;
};

const readApiErrorBody = async (response: Response): Promise<ApiErrorBody | null> => {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) return null;

  try {
    const body = await response.json() as ApiErrorBody;
    return body && typeof body === 'object' ? body : null;
  } catch {
    return null;
  }
};

export async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(path, {
      ...init,
      headers,
      cache: 'no-store',
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(REQUEST_TIMEOUT_MESSAGE);
    }
    throw new Error(NETWORK_FAILURE_MESSAGE);
  } finally {
    window.clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const fallbackMessage = `Request failed: ${response.status} ${response.statusText}`;
    const body = await readApiErrorBody(response);
    const message = body?.message?.trim() || body?.error?.trim() || fallbackMessage;

    if (response.status === 429) {
      throw new RateLimitedError(message, {
        path,
        status: response.status,
        retryAfterSeconds: parseRetryAfterSeconds(response.headers.get('Retry-After')),
      });
    }

    if (response.status === 503 && body?.error === 'database_unavailable') {
      throw new ServicePausedCandidateError(message, {
        reason: 'database_unavailable',
        path,
        status: response.status,
      });
    }

    throw new Error(message);
  }

  const raw = await response.text();
  if (!raw) {
    return null as T;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(INVALID_RESPONSE_MESSAGE);
  }
}
