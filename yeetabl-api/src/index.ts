import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';
import { IRequestStrict } from 'itty-router';
import { Env } from './types';
import { env } from 'process';

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

router.all(
  '/api/ingest',
  async (req: SegmentRequest, env: Env, ctx: ExecutionContext) => {
    console.log('Received request:', req);
    const json: SegmentEvent = await req.json();
    console.log('Request json:', json);
    console.log('Request data:');

    // send the event to the CF Workers Analytics Engine
    const dataset = env.YEET;
    dataset.writeDataPoint({
      blobs: [
        JSON.stringify(json),
        // json.messageId,
        // json.timestamp,
        // json.type,
        // json.email,
        // JSON.stringify(json.properties),
        // json.event,
      ],
      // indexes: [json.userId],
      doubles: [],
    });

    return new Response(JSON.stringify('Stored in Analytics Engine'), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

// router.get('/api/logs', async (req, env:Env, ctx: ExecutionContext) => {
//   const dataset = env.YEET;

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
