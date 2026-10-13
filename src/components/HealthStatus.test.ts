import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HealthStatus from './HealthStatus.vue';

describe('HealthStatus', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows Backend: OK when /health returns ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'ok' }) }),
    );
    const wrapper = mount(HealthStatus);
    await flushPromises();
    expect(wrapper.text()).toContain('Backend: OK');
  });

  it('shows Backend: DOWN when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('fetch failed')),
    );
    const wrapper = mount(HealthStatus);
    await flushPromises();
    expect(wrapper.text()).toContain('Backend: DOWN');
  });
});
