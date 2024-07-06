import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold mb-6">Yeetable: Event Stream Monitoring Made Easy</h1>
      <p className="text-lg mb-6">Welcome to Yeetable. Throw any event stream at us, no matter the volume. We ingest it all into our analytics engine, then let you select indexes to monitor, set thresholds, and we'll hit webhooks to notify you.</p>
      <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Ingest high-volume event streams</li>
        <li>Select custom indexes for monitoring</li>
        <li>Set flexible thresholds</li>
        <li>Receive webhook notifications</li>
      </ul>
      <p className="text-xl font-semibold mb-4">Ready to yeet your event streams?</p>
      <Link href="/thresholds" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        Set up your thresholds →
      </Link>
    </div>
  )
}
