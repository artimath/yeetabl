import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';
import { IRequestStrict } from 'itty-router';

export const router = OpenAPIRouter({
  docs_url: '/',
});

type SegmentEvent = {
  messageId: string;
  timestamp: string;
  type: string;
  email: string;
  properties: Record<string, any>;
  userId: string;
  event: string;
};

type SegmentRequest = {
  method: 'POST';
  headers: {
    'content-type': string;
    'user-agent': string;
    authorization: string;
  };
  body: SegmentEvent;
} & IRequestStrict;

router.all('/api/ingest', async (req: SegmentRequest) => {
  console.log('Received request:', req);
  const data = await req.json();
  console.log('Request data:', data);

  // send the event to the CF Workers Analytics Engine

  return new Response(JSON.stringify('Nope'), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

// 404 for everything else
router.all('*', () =>
  Response.json(
    {
      success: false,
      error: 'Route not found',
    },
    { status: 404 },
  ),
);

export default {
  fetch: router.handle,
} satisfies ExportedHandler;
