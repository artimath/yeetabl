import React, { useMemo } from 'react';
import { dummyMetrics } from '../dummyData';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { DemoLineChart } from './DemoLineChart';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface CompiledMetricsProps {
  currentTable: string;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export const CompiledMetrics: React.FC<CompiledMetricsProps> = ({ currentTable, timeRange, onTimeRangeChange }) => {
  const relevantMetrics = useMemo(() => dummyMetrics.filter(metric => metric.eventName === currentTable), [currentTable]);

  const handleAddMetric = () => {
    console.log('Add new metric clicked');
    // Implement the logic to add a new metric here
  };

  const generateDummyChartData = (range: string) => {
    const data = [];
    const today = new Date();
    const dataPoints = {
      '24h': 24,
      '7d': 7,
      '30d': 30,
      '3m': 90,
      '1y': 365
    }[range] || 7;

    for (let i = dataPoints - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        date: date,
        value: Math.floor(Math.random() * 1000) + 500
      });
    }
    return data;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Relevant Compiled Metrics for {currentTable}</CardTitle>
          <Button onClick={handleAddMetric}>Add New Metric</Button>
        </CardHeader>
        <CardContent>
          <Tabs value={timeRange} onValueChange={onTimeRangeChange} className="mb-4">
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="3m">3m</TabsTrigger>
              <TabsTrigger value="1y">1y</TabsTrigger>
            </TabsList>
          </Tabs>
          {relevantMetrics.length > 0 ? (
            <div className="space-y-6">
              {relevantMetrics.map((metric) => (
                <Card key={metric.id}>
                  <CardHeader>
                    <CardTitle>{metric.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {`${metric.aggregation} of ${metric.field || ''} from ${metric.eventName} events`}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <DemoLineChart data={generateDummyChartData(timeRange)} />
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                      Trending up by 5.2% this {timeRange} <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing data for the last {timeRange}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>No relevant metrics for this table.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
