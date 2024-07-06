import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Segment Event Threshold Monitoring System</h1>
      <p>Welcome to the Segment Event Threshold Monitoring System. This system allows you to set and monitor thresholds for your Segment events.</p>
      <h2>Key Features:</h2>
      <ul>
        <li>Set complex criteria for monitoring customer data</li>
        <li>Receive notifications when thresholds are met</li>
        <li>Flexible and self-service solution</li>
      </ul>
      <p>Ready to get started?</p>
      <p>
        <Link href="/thresholds">
          Manage your thresholds →
        </Link>
      </p>
    </div>
  )
}
