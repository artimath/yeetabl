import Link from 'next/link'
import LiveUpdate from '../components/LiveUpdate'

const data = [
  { date: '2023-01-01', value: 1500 },
  { date: '2023-01-02', value: 1800 },
  { date: '2023-01-03', value: 2100 },
  { date: '2023-01-04', value: 2400 },
  { date: '2023-01-05', value: 2700 },
  { date: '2023-01-06', value: 3000 },
  { date: '2023-01-07', value: 3300 }
]

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold mb-6">Yeetable: Keep Tabs on Your Top Customers</h1>
      <p className="text-lg mb-6">Welcome to Yeetable. We help you monitor your most valuable customers in real-time. Our system ingests your event streams, analyzes customer behavior, and alerts you when top customers need attention.</p>
      
      <LiveUpdate data={data} />
      
      <h2 className="text-2xl font-semibold mb-4 mt-8">Key Features:</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Track high-value customer activity</li>
        <li>Set custom thresholds for important metrics</li>
        <li>Receive instant alerts for critical changes</li>
        <li>Analyze trends in top customer behavior</li>
      </ul>
      <p className="text-xl font-semibold mb-4">Ready to supercharge your customer monitoring?</p>
      <Link href="/thresholds" className="inline-block bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
        Start monitoring top customers →
      </Link>
    </div>
  )
}
