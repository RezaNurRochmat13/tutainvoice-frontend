import { afterEach, describe, expect, it, vi } from 'vitest';
import { getHealth } from './health';

describe('getHealth', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns status ok from /health', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ status: 'ok' }) });
    vi.stubGlobal('fetch', fetchMock);
    await expect(getHealth()).resolves.toEqual({ status: 'ok' });
    expect(fetchMock).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/health`,
      undefined,
    );
  });
});
