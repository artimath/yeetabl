# Yeetabl API

This is the backend API for the Yeetabl project, a Segment Event Threshold Monitoring System. It's built using Cloudflare Workers with OpenAPI 3.1 and [itty-router-openapi](https://github.com/cloudflare/itty-router-openapi).

## Features

- Receives and processes events from Segment
- Manages user-defined thresholds
- Checks thresholds and sends notifications
- Provides RESTful API for the frontend

## Getting Started

1. Sign up for [Cloudflare Workers](https://workers.dev).
2. Clone this project and install dependencies with `npm install`
3. Run `wrangler login` to log in to your Cloudflare account in wrangler
4. Run `wrangler deploy` to publish the API to Cloudflare Workers

## Project Structure

1. The main router is defined in `src/index.ts`.
2. Each endpoint has its own file in `src/endpoints/`.
3. Utility functions and shared logic are in `src/utils/`.

## Development

1. Run `wrangler dev` to start a local instance of the API.
2. Open `http://localhost:9000/` in your browser to see the Swagger interface where you can try the endpoints.
3. Changes made in the `src/` folder will automatically trigger the server to reload, you only need to refresh the Swagger interface.

## API Endpoints

- `/segment-webhook`: Receives events from Segment
- `/thresholds`: CRUD operations for managing thresholds
- `/notifications`: Manages notification settings

For more detailed API documentation, refer to the Swagger UI when running the project locally.

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
