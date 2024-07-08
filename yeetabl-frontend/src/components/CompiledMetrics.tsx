import React from 'react';
import { dummyMetrics } from '../dummyData';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { DemoLineChart } from './DemoLineChart';

export const CompiledMetrics: React.FC<{ currentTable: string }> = ({ currentTable }) => {
  const relevantMetrics = dummyMetrics.filter(metric => metric.eventName === currentTable);

  const handleAddMetric = () => {
    console.log('Add new metric clicked');
    // Implement the logic to add a new metric here
  };

  // Dummy data for the chart
  const generateDummyChartData = () => {
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
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
                    <DemoLineChart data={generateDummyChartData()} />
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing total visitors for the last 6 months
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
