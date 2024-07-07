import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';

export const router = OpenAPIRouter({
	docs_url: "/",
});



router.all('/api/ingest', (req) => {
	const { body } = req;
	console.log(body);
	return new Response(JSON.stringify("Success"), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		
	});
});

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
} satisfies ExportedHandler;
