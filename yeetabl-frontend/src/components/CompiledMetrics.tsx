import React from 'react';
import { dummyMetrics } from '../dummyData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { DemoLineChart } from './DemoLineChart';

export const CompiledMetrics: React.FC<{ currentTable: string }> = ({ currentTable }) => {
  const relevantMetrics = dummyMetrics.filter(metric => metric.eventName === currentTable);

  const handleAddMetric = () => {
    console.log('Add new metric clicked');
    // Implement the logic to add a new metric here
  };

  // Dummy data for the chart
  const dummyChartData = [
    { date: '2023-01-01', value: 1500 },
    { date: '2023-01-02', value: 1800 },
    { date: '2023-01-03', value: 2100 },
    { date: '2023-01-04', value: 2400 },
    { date: '2023-01-05', value: 2700 },
    { date: '2023-01-06', value: 3000 },
    { date: '2023-01-07', value: 3300 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Relevant Compiled Metrics for {currentTable}</CardTitle>
          <Button onClick={handleAddMetric}>Add New Metric</Button>
        </CardHeader>
        <CardContent>
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
                    <DemoLineChart data={dummyChartData} />
                  </CardContent>
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
