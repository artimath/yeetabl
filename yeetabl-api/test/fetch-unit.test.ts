import { createExecutionContext, env, waitOnExecutionContext } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import worker, { router } from '../src/index';

// This will improve in the next major version of `@cloudflare/workers-types`,
// but for now you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('unit tests', () => {
  it('gets fetch event', async () => {
    const request = new IncomingRequest('http://example.com');
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    expect(await response.text()).toContain('<!DOCTYPE html>');
  });
});
