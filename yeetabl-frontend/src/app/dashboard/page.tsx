'use client';
import { ApiKeyManager } from '../../components/ApiKeyManager';
import { DashboardLayout } from '../../components/DashboardLayout';

import { SchemaViewer } from '../../components/SchemaViewer';
import { CompiledMetrics } from '../../components/CompiledMetrics';
import { ThresholdMonitor } from '../../components/ThresholdMonitor';
import { useState, useCallback, useEffect } from 'react';
import { eventTables } from '../../dummyData';
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [currentTable, setCurrentTable] = useState(Object.keys(eventTables)[0]);
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleTableChange = useCallback((tableName: string) => {
    setCurrentTable(tableName);
  }, []);

  const handleTimeRangeChange = useCallback((range: string) => {
    setTimeRange(range);
  }, []);

  const refreshData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Uncomment the following line to simulate an error
      // setError('Failed to fetch data. Please try again.');
    }, 1000);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">Dashboard Summary</h1>
        <div className="bg-secondary p-4 rounded-lg text-secondary-foreground">
          <p>Total Events: 10,000</p>
          <p>Active Thresholds: 5</p>
          <p>Alerts Triggered (Last 24h): 3</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <ApiKeyManager />
        <Button onClick={refreshData} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Refresh Data'}
        </Button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="mt-8 space-y-8">
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Event Tables Schema</h2>
            <SchemaViewer onTableChange={handleTableChange} />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Relevant Compiled Metrics</h2>
            <CompiledMetrics
              currentTable={currentTable}
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </div>
        </div>
        <div className="pt-4">
          <h2 className="text-2xl font-bold mb-4">Threshold Monitor</h2>
          <ThresholdMonitor />
        </div>
      </div>
    </DashboardLayout>
  );
}
