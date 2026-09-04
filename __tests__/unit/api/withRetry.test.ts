import { HttpError } from '../../../src/api/HttpError';
import { GET_RETRY, isRetryableError, withRetry } from '../../../src/api/withRetry';

describe('withRetry', () => {
  it('returns the first successful result without retrying', async () => {
    const request = jest.fn().mockResolvedValue('ok');

    await expect(withRetry(request, { delayMs: 0 })).resolves.toBe('ok');
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('retries a TypeError once then returns success', async () => {
    const request = jest
      .fn()
      .mockRejectedValueOnce(new TypeError('Network request failed'))
      .mockResolvedValueOnce('ok');

    await expect(withRetry(request, { delayMs: 0 })).resolves.toBe('ok');
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('does not retry HttpError 400', async () => {
    const request = jest.fn().mockRejectedValue(new HttpError(400, 'HTTP 400'));

    await expect(withRetry(request, { delayMs: 0 })).rejects.toThrow('HTTP 400');
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('uses GET_RETRY defaults', () => {
    expect(GET_RETRY).toEqual({ retries: 1, delayMs: 1000 });
  });

  it('treats 500 as retryable and 404 as not', () => {
    expect(isRetryableError(new HttpError(500, 'HTTP 500'))).toBe(true);
    expect(isRetryableError(new HttpError(404, 'HTTP 404'))).toBe(false);
    expect(isRetryableError(new TypeError('Network request failed'))).toBe(true);
    expect(isRetryableError(new SyntaxError('Unexpected token'))).toBe(false);
  });
});
