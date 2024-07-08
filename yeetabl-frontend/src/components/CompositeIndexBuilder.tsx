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

type SubScore = {
  name: string;
  weight: number;
  conditions: Condition[];
  aggregations: Aggregation[];
};

type Threshold = {
  name: string;
  subScores: SubScore[];
  triggerValue: number;
  consecutivePeriods?: number;
  customerSegment?: {
    field: string;
    operator: Operator;
    value: number;
  };
};

export function CompositeIndexBuilder() {
  const [threshold, setThreshold] = useState<Threshold>({
    name: '',
    subScores: [],
    triggerValue: 0,
  });

  const [newSubScore, setNewSubScore] = useState<SubScore>({
    name: '',
    weight: 1,
    conditions: [],
    aggregations: [],
  });

  const addSubScore = () => {
    if (newSubScore.name) {
      setThreshold({
        ...threshold,
        subScores: [...threshold.subScores, newSubScore],
      });
      setNewSubScore({ name: '', weight: 1, conditions: [], aggregations: [] });
    }
  };

  const removeSubScore = (index: number) => {
    setThreshold({
      ...threshold,
      subScores: threshold.subScores.filter((_, i) => i !== index),
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
          <CardTitle>Create New Composite Threshold</CardTitle>
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
              <CardTitle>Customer Segment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Define the customer segment this threshold applies to.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Input
                  placeholder="Field (e.g., MRR)"
                  value={threshold.customerSegment?.field || ''}
                  onChange={(e) => setThreshold({ ...threshold, customerSegment: { ...threshold.customerSegment, field: e.target.value } as any })}
                  className="flex-grow"
                />
                <Select
                  value={threshold.customerSegment?.operator}
                  onValueChange={(value) => setThreshold({ ...threshold, customerSegment: { ...threshold.customerSegment, operator: value as Operator } as any })}
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
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Value"
                  value={threshold.customerSegment?.value || ''}
                  onChange={(e) => setThreshold({ ...threshold, customerSegment: { ...threshold.customerSegment, value: Number(e.target.value) } as any })}
                  className="w-40"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Sub-Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Define the components of your composite score.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Input
                  placeholder="Sub-Score Name"
                  value={newSubScore.name}
                  onChange={(e) => setNewSubScore({ ...newSubScore, name: e.target.value })}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  placeholder="Weight"
                  value={newSubScore.weight}
                  onChange={(e) => setNewSubScore({ ...newSubScore, weight: Number(e.target.value) })}
                  className="w-24"
                />
                <Button onClick={addSubScore}>Add Sub-Score</Button>
              </div>
              <ul className="space-y-2">
                {threshold.subScores.map((subScore, index) => (
                  <li key={index} className="flex justify-between items-center bg-secondary p-2 rounded">
                    <span>
                      {subScore.name} (Weight: {subScore.weight})
                    </span>
                    <Button variant="destructive" size="sm" onClick={() => removeSubScore(index)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
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
          
          <Button onClick={createThreshold} className="mt-4 w-full">Create Composite Threshold</Button>
        </CardContent>
      </Card>
    </div>
  );
}
