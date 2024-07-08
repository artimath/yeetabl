'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CostGraph from '@/components/CostGraph';

const ArchitecturePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        <em>streams should be yeetabl!</em>
      </h1>
      <h2 className="text-2xl font-bold mb-6">
        Segment Event Threshold Monitoring System: Architecture Overview and Cost Analysis
      </h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Architecture Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We used Cloudflare's workers platform to build a serverless system that can
            scale up to billions of events per day, and scale down to zero, while
            minimizing infrastructure costs and maintenance. Workers Analytics Engine
            allows for immediate reads at high rps, while enabling efficient queries
            across massive datasets.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Design Decisions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            <li>
              <strong>Serverless Architecture</strong>: Utilizing Cloudflare Workers for
              instant scalability and optimal performance.
            </li>
            <li>
              <strong>Analytics Engine for Data Storage</strong>: Handling high RPS and
              high cardinality data efficiently.
            </li>
            <li>
              <strong>Composite Indexing</strong>: Custom indexing system for efficient
              querying of complex threshold conditions.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Cost Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">Estimated Monthly Costs:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>10,000 events per day (300,000 per month)</strong>: $0 (Included in free tier)
            </li>
            <li>
              <strong>1 million events per day (30 million per month)</strong>:
              <ul className="list-disc pl-6">
                <li>Non-batched: $11</li>
                <li>Batched (2000 events per call): $5</li>
              </ul>
            </li>
            <li>
              <strong>1 billion events per day (30 billion per month)</strong>:
              <ul className="list-disc pl-6">
                <li>Non-batched: $16,500</li>
                <li>Batched (2000 events per call): $7,501.50</li>
              </ul>
            </li>
          </ul>
          <p>
            These estimates are based on current Cloudflare pricing. Batching 2000 events per call significantly reduces costs.
            Actual monthly costs may vary based on processing complexity and event volume.
          </p>
          <p className="mt-2">
            <strong>Note:</strong> Analytics Engine is currently free, which further reduces the overall cost of the system.
          </p>
          <h4 className="text-lg font-semibold mt-4 mb-2">Impact Analysis:</h4>
          <p>Cost Reduction:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>At 1 million events/day: 54.5% cost reduction</li>
            <li>At 1 billion events/day: 54.5% cost reduction</li>
          </ul>
          <div className="mt-4">
            <CostGraph />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitecturePage;
