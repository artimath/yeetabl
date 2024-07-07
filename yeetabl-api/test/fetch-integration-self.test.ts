import { SELF } from 'cloudflare:test';
import { expect, it } from 'vitest';

it('dispatches fetch event', async () => {
  // `SELF` here points to the worker running in the current isolate.
  // This gets its handler from the `main` option in `vitest.config.mts`.
  // Importantly, it uses the exact `import("../src").default` instance we could
  // import in this file as its handler.
  const response = await SELF.fetch('http://example.com');
  expect(await response.text()).toContain('<!DOCTYPE html>');
});

// handles post for /api/ingest
// example
// curl -X 'POST' 'https://webhook.site/8e71a9e7-6d9e-471c-843b-56587772f2ca'
// -H 'host: webhook.site'
// -H 'connection: close'
// -H 'accept-encoding: gzip,deflate'
// -H 'content-length: 240'
// -H 'accept: */*'
// -H 'content-type: application/json'
// -H 'authorization: Bearer 123'
// -H 'user-agent: Segment (Actions)'
// -d $'[{
//     messageId: 'segment-test-message-109c5',
//     timestamp: '2024-07-07T07:15:49.064Z',
//     type: 'track',
//     email: 'test@example.org',
//     properties: { property1: 1, property2: 'test', property3: true },
//     userId: 'test-user-geg1hh',
//     event: 'Page Viewed',
//   },
// ];

it('handles post for /api/ingest', async () => {
  const response = await SELF.fetch('http://localhost:8788/api/ingest/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Segment (Actions)',
      authorization: 'Bearer 123',
    },
    body: JSON.stringify({
      messageId: 'segment-test-message-109c5',
      timestamp: '2024-07-07T07:15:49.064Z',
      type: 'track',
      email: 'test@example.org',
      properties: { property1: 1, property2: 'test', property3: true },
      userId: 'test-user-geg1hh',
      event: 'Page Viewed',
    }),
  });
  expect(response.status).toBe(200);
  const data = await response.json();
  console.log('Response data:', data);
  expect(data).toEqual('Nope');
});
