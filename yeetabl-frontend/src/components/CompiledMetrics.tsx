import React from 'react';
import { dummyMetrics } from '../dummyData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const CompiledMetrics: React.FC<{ currentTable: string }> = ({ currentTable }) => {
  const relevantMetrics = dummyMetrics.filter(metric => metric.eventName === currentTable);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relevant Compiled Metrics for {currentTable}</CardTitle>
        </CardHeader>
        <CardContent>
          {relevantMetrics.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric Name</TableHead>
                  <TableHead>Composition</TableHead>
                  <TableHead>Example</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relevantMetrics.map((metric) => (
                  <TableRow key={metric.id}>
                    <TableCell>{metric.name}</TableCell>
                    <TableCell>
                      {`${metric.aggregation} of ${metric.field || ''} from ${metric.eventName} events`}
                    </TableCell>
                    <TableCell>
                      {metric.name === 'Daily Active Users' && '150 users'}
                      {metric.name === 'Average API Response Time' && '250 ms'}
                      {metric.name === 'Total Revenue' && '$10,000'}
                      {metric.name === 'New User Signups' && '50 signups'}
                      {metric.name === 'Instance Creation Rate' && '25 instances/hour'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No relevant metrics for this table.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
