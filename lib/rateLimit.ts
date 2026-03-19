export const rateLimitedRoute = '/rate-limited';

interface RateLimitedErrorOptions {
  path: string;
  status?: number;
  retryAfterSeconds?: number;
}

export class RateLimitedError extends Error {
  readonly path: string;
  readonly status?: number;
  readonly retryAfterSeconds?: number;

  constructor(message: string, options: RateLimitedErrorOptions) {
    super(message);
    this.name = 'RateLimitedError';
    this.path = options.path;
    this.status = options.status;
    this.retryAfterSeconds = options.retryAfterSeconds;
  }
}

export const isRateLimitedError = (error: unknown): error is RateLimitedError =>
  error instanceof RateLimitedError;

export const buildRateLimitedPath = (from?: string, retryAfterSeconds?: number) => {
  const params = new URLSearchParams();
  if (from) params.set('from', from);
  if (typeof retryAfterSeconds === 'number' && Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
    params.set('retryAfter', String(Math.ceil(retryAfterSeconds)));
  }
  const query = params.toString();
  return query ? `${rateLimitedRoute}?${query}` : rateLimitedRoute;
};

export const parseRetryAfterFromSearch = (search: string) => {
  const value = new URLSearchParams(search).get('retryAfter');
  if (!value) return null;
  const seconds = Number.parseInt(value, 10);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
};
