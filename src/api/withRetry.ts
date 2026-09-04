import { HttpError } from './HttpError';

export const GET_RETRY = {
  retries: 1,
  delayMs: 1000,
};

const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

export const isRetryableError = (error: unknown): boolean => {
  if (error instanceof HttpError) {
    return RETRYABLE_STATUS.has(error.status);
  }

  return error instanceof TypeError;
};

const wait = (delayMs: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

type RetryOptions = {
  retries?: number;
  delayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
};

export const withRetry = async <T>(
  request: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> => {
  const retries = options.retries ?? GET_RETRY.retries;
  const delayMs = options.delayMs ?? GET_RETRY.delayMs;
  const shouldRetry = options.shouldRetry ?? isRetryableError;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await request();
    } catch (error) {
      lastError = error;
      const canRetry = attempt < retries && shouldRetry(error);

      if (!canRetry) {
        throw error;
      }

      await wait(delayMs);
    }
  }

  throw lastError;
};
