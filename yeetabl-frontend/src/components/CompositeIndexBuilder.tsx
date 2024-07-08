import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Operator = '>' | '>=' | '=' | '<' | '<=' | 'decreased_by' | 'increased_by';
type AggregationFunction = 'sum' | 'average' | 'count' | 'min' | 'max' | 'percent_change';

type Condition = {
  field: string;
  operator: Operator;
  value: number;
  comparisonPeriod?: string;
};

type Aggregation = {
  field: string;
  function: AggregationFunction;
  timeWindow: string;
};

type Threshold = {
  name: string;
  conditions: Condition[];
  aggregations: Aggregation[];
  triggerValue: number;
  consecutivePeriods?: number;
};

export function CompositeIndexBuilder() {
  const [threshold, setThreshold] = useState<Threshold>({
    name: '',
    conditions: [],
    aggregations: [{ field: '', function: 'sum', timeWindow: '1d' }],
    triggerValue: 0,
  });

  const [newCondition, setNewCondition] = useState<Condition>({
    field: '',
    operator: '>',
    value: 0,
    comparisonPeriod: '',
  });

  const addCondition = () => {
    if (newCondition.field) {
      setThreshold({
        ...threshold,
        conditions: [...threshold.conditions, newCondition],
      });
      setNewCondition({ field: '', operator: '>', value: 0 });
    }
  };

  const removeCondition = (index: number) => {
    setThreshold({
      ...threshold,
      conditions: threshold.conditions.filter((_, i) => i !== index),
    });
  };

  const createThreshold = async () => {
    try {
      console.log('Creating threshold:', threshold);
      // Here you would implement the logic to create the threshold
      // You might want to send this data to your backend API
      // await api.createThreshold(threshold);
      // Show success message
    } catch (error) {
      console.error('Failed to create threshold:', error);
      // Show error message
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Threshold</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Threshold Name"
            value={threshold.name}
            onChange={(e) => setThreshold({ ...threshold, name: e.target.value })}
            className="mb-4"
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Define conditions that will trigger this threshold.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Input
                  placeholder="Field"
                  value={newCondition.field}
                  onChange={(e) => setNewCondition({ ...newCondition, field: e.target.value })}
                  className="flex-grow"
                />
                <Select
                  value={newCondition.operator}
                  onValueChange={(value) => setNewCondition({ ...newCondition, operator: value as Operator })}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=">">{'>'}</SelectItem>
                    <SelectItem value=">=">{'≥'}</SelectItem>
                    <SelectItem value="=">{'='}</SelectItem>
                    <SelectItem value="<">{'<'}</SelectItem>
                    <SelectItem value="<=">{'≤'}</SelectItem>
                    <SelectItem value="decreased_by">Decreased by</SelectItem>
                    <SelectItem value="increased_by">Increased by</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Value"
                  value={newCondition.value}
                  onChange={(e) => setNewCondition({ ...newCondition, value: Number(e.target.value) })}
                  className="w-24"
                />
                {(newCondition.operator === 'decreased_by' || newCondition.operator === 'increased_by') && (
                  <Input
                    placeholder="Comparison Period"
                    value={newCondition.comparisonPeriod || ''}
                    onChange={(e) => setNewCondition({ ...newCondition, comparisonPeriod: e.target.value })}
                    className="w-40"
                  />
                )}
                <Button onClick={addCondition}>Add Condition</Button>
              </div>
              <ul className="space-y-2">
                {threshold.conditions.map((condition, index) => (
                  <li key={index} className="flex justify-between items-center bg-secondary p-2 rounded">
                    <span>
                      {condition.field} {condition.operator} {condition.value}
                      {condition.comparisonPeriod && ` (${condition.comparisonPeriod})`}
                    </span>
                    <Button variant="destructive" size="sm" onClick={() => removeCondition(index)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Aggregations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Define how data should be aggregated for this threshold.
              </p>
              {threshold.aggregations.map((aggregation, index) => (
                <div key={index} className="flex flex-wrap gap-2 mb-4">
                  <Input
                    placeholder="Field"
                    value={aggregation.field}
                    onChange={(e) => {
                      const newAggregations = [...threshold.aggregations];
                      newAggregations[index] = { ...aggregation, field: e.target.value };
                      setThreshold({ ...threshold, aggregations: newAggregations });
                    }}
                    className="flex-grow"
                  />
                  <Select
                    value={aggregation.function}
                    onValueChange={(value) => {
                      const newAggregations = [...threshold.aggregations];
                      newAggregations[index] = { ...aggregation, function: value as AggregationFunction };
                      setThreshold({ ...threshold, aggregations: newAggregations });
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Function" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sum">Sum</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="count">Count</SelectItem>
                      <SelectItem value="min">Min</SelectItem>
                      <SelectItem value="max">Max</SelectItem>
                      <SelectItem value="percent_change">Percent Change</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Time Window (e.g., 1d, 7d)"
                    value={aggregation.timeWindow}
                    onChange={(e) => {
                      const newAggregations = [...threshold.aggregations];
                      newAggregations[index] = { ...aggregation, timeWindow: e.target.value };
                      setThreshold({ ...threshold, aggregations: newAggregations });
                    }}
                    className="w-40"
                  />
                  <Button variant="destructive" size="sm" onClick={() => {
                    const newAggregations = threshold.aggregations.filter((_, i) => i !== index);
                    setThreshold({ ...threshold, aggregations: newAggregations });
                  }}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={() => {
                setThreshold({
                  ...threshold,
                  aggregations: [...threshold.aggregations, { field: '', function: 'sum', timeWindow: '1d' }]
                });
              }}>
                Add Aggregation
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Trigger Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Set the value that will trigger this threshold and how many consecutive periods it should occur.
              </p>
              <div className="flex flex-wrap gap-2">
                <Input
                  type="number"
                  placeholder="Trigger Value"
                  value={threshold.triggerValue}
                  onChange={(e) => setThreshold({ ...threshold, triggerValue: Number(e.target.value) })}
                  className="w-40"
                />
                <Input
                  type="number"
                  placeholder="Consecutive Periods (optional)"
                  value={threshold.consecutivePeriods || ''}
                  onChange={(e) => setThreshold({ ...threshold, consecutivePeriods: Number(e.target.value) || undefined })}
                  className="w-64"
                />
              </div>
            </CardContent>
          </Card>
          
          <Button onClick={createThreshold} className="mt-4 w-full">Create Threshold</Button>
        </CardContent>
      </Card>
    </div>
  );
}
