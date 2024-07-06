'use client';
import React, { useEffect, useState } from 'react';
import { generateDataPoints } from '@/lib/dataUtils';
import { BarChartComponent } from '@/components/BarChartLiveUpdate';

const LiveUpdate: React.FC = () => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const data = generateDataPoints('2023-01-01', 10, 1500, 300);
    setDataPoints(data);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Live Update</h3>
      <p className="text-lg mb-4">
        Currently processing <span className="font-bold">1,234,567</span> events/second
      </p>
      <div className="h-64 bg-white dark:bg-gray-700 rounded-md p-2">
        <div className="w-full h-full">
          <BarChartComponent data={dataPoints} />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Last 10 minutes of ingestion</p>
    </div>
  );
};

export default LiveUpdate;
