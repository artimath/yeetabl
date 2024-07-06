import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Yeetable: Event Stream Monitoring Made Easy</h1>
      <p>Welcome to Yeetable. Throw any event stream at us, no matter the volume. We ingest it all into our analytics engine, then let you select indexes to monitor, set thresholds, and we'll hit webhooks to notify you.</p>
      <h2>Key Features:</h2>
      <ul>
        <li>Ingest high-volume event streams</li>
        <li>Select custom indexes for monitoring</li>
        <li>Set flexible thresholds</li>
        <li>Receive webhook notifications</li>
      </ul>
      <p>Ready to yeet your event streams?</p>
      <p>
        <Link href="/thresholds">
          Set up your thresholds →
        </Link>
      </p>
    </div>
  )
}
