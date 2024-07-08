import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto p-8 font-sans">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <h1 className="text-5xl font-bold mb-6 text-primary">
          Yeetable: Intelligent Customer Monitoring
        </h1>
        <p className="text-xl mb-8 text-foreground">
          Harness the power of your Segment data to keep a pulse on your most valuable customers. 
          Set smart thresholds, receive timely alerts, and never miss a critical change in customer behavior.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Powerful Threshold Monitoring</h2>
            <ul className="space-y-2">
              <li>✓ Create complex, multi-condition thresholds</li>
              <li>✓ Monitor team size, service type, and costs</li>
              <li>✓ Set time-based conditions and aggregations</li>
            </ul>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Real-time Insights</h2>
            <ul className="space-y-2">
              <li>✓ Process Segment events in real-time</li>
              <li>✓ View compiled metrics and trends</li>
              <li>✓ Receive instant notifications via webhooks</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">Ready to transform your customer monitoring?</h2>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started with Yeetable →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
