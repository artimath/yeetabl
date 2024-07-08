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
          <h3 className="text-xl font-semibold mb-2">Estimated Daily Costs:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>10,000 events per day</strong>: $0 (Included in free tier)
            </li>
            <li>
              <strong>1 million events per day</strong>: $0.37
            </li>
            <li>
              <strong>1 billion events per day</strong>: $550
            </li>
          </ul>
          <p>
            These estimates assume efficient code and optimized queries. Actual daily costs may
            vary based on processing complexity and event volume.
          </p>
          <div className="mt-4">
            <CostGraph />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitecturePage;
