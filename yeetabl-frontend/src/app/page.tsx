import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Segment Event Threshold Monitoring System</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Welcome to the Segment Event Threshold Monitoring System. This system allows you to set and monitor thresholds for your Segment events.</p>
                <ul className="list-disc space-y-2">
                  <li>Set complex criteria for monitoring customer data</li>
                  <li>Receive notifications when thresholds are met</li>
                  <li>Flexible and self-service solution</li>
                </ul>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p>Ready to get started?</p>
                <p>
                  <Link href="/thresholds" className="text-cyan-600 hover:text-cyan-700">
                    Manage your thresholds &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
