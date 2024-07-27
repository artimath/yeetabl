# Yeetabl: Segment Event Threshold Monitoring System

## Project Overview
Yeetabl is a serverless system built on Cloudflare that acts as a Segment destination, processes incoming events, and monitors for user-defined thresholds. It allows users to set complex criteria for monitoring their customer data and receive notifications when these criteria are met.

## Key Features
- Real-time event processing from Segment
- User-defined threshold configuration
- Complex criteria setting for data monitoring
- Webhook notifications for threshold breaches
- Flexible and self-service solution

## Technical Stack
- Cloudflare Workers for serverless computing
- Cloudflare Workers Analytics Engine for data storage and querying
- Cloudflare Workers KV for storing user-defined thresholds
- Next.js for the frontend user interface

## System Components

1. **Segment Destination (Cloudflare Worker)**
   - Receives events from Segment
   - Processes and stores events in Workers Analytics Engine
   - Creates composite indexes for efficient querying

2. **Threshold Management (Cloudflare Worker)**
   - Allows users to create, read, update, and delete threshold configurations
   - Stores configurations in Workers KV

3. **Threshold Checking (Scheduled Cloudflare Worker)**
   - Runs periodically to check if any thresholds have been crossed
   - Queries Workers Analytics Engine based on user-defined thresholds
   - Sends webhook notifications when thresholds are crossed

4. **User Interface (Next.js)**
   - Provides a dashboard for users to manage their threshold configurations
   - Allows viewing, creating, and editing of thresholds

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/yeetabl.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Cloudflare Workers:
   - Follow the Cloudflare Workers documentation to set up your workers
   - Configure the necessary bindings and KV namespaces

4. Set up the Next.js frontend:
   - Navigate to the frontend directory
   - Install dependencies: `npm install`
   - Start the development server: `npm run dev`

5. Configure Segment:
   - Set up Yeetabl as a custom destination in your Segment account

## Usage

1. Access the Yeetabl dashboard
2. Create and configure thresholds based on your Segment events
3. Monitor the real-time event log
4. Receive notifications when thresholds are crossed

## Contributing

We welcome contributions to Yeetabl! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please open an issue in the GitHub repository or contact the maintainers directly.
