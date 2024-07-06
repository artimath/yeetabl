'use client';
import Link from 'next/link';
import LiveUpdate from '../components/LiveUpdate';
import { ApiKeyManager } from '@/components/ApiKeyManager';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold mb-6">
        Yeetable: Keep Tabs on Your Top Customers
      </h1>
      <p className="text-lg mb-6">
        Welcome to Yeetable. We help you monitor your most valuable customers in
        real-time. Our system ingests your event streams, analyzes customer behavior, and
        alerts you when top customers need attention.
      </p>

      {/* <LiveUpdate /> */}

      <h2 className="text-2xl font-semibold mb-4 mt-8">Key Features:</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Track high-value customer activity</li>
        <li>Set custom thresholds for important metrics</li>
        <li>Receive instant alerts for critical changes</li>
        <li>Analyze trends in top customer behavior</li>
      </ul>
      <p className="text-xl font-semibold mb-4">
        Ready to supercharge your customer monitoring?
      </p>
      <Link
        href="/dashboard"
        className="inline-block bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard →
      </Link>
    </div>
  );
}
