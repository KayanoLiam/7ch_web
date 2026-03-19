import { buildRateLimitedPath, isRateLimitedError } from './rateLimit';
import { buildServicePausedPath, isServicePausedCandidateError } from './servicePause';

export const buildKnownErrorRedirectPath = (error: unknown, from?: string) => {
  if (isRateLimitedError(error)) {
    return buildRateLimitedPath(from, error.retryAfterSeconds);
  }

  if (isServicePausedCandidateError(error)) {
    return buildServicePausedPath(from);
  }

  return null;
};
