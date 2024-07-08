import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Metric {
  id: string;
  name: string;
  aggregation: string;
}

interface MetricSelectorProps {
  onAddMetric: (metric: Metric) => void;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ onAddMetric }) => {
  const [metricName, setMetricName] = useState('');
  const [aggregation, setAggregation] = useState('sum');

  const handleAddMetric = () => {
    if (metricName.trim()) {
      const newMetric: Metric = {
        id: Date.now().toString(),
        name: metricName.trim(),
        aggregation,
      };
      onAddMetric(newMetric);
      setMetricName('');
      setAggregation('sum');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="metricName">Metric Name</Label>
        <Input
          id="metricName"
          value={metricName}
          onChange={(e) => setMetricName(e.target.value)}
          placeholder="Enter metric name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="aggregation">Aggregation</Label>
        <Select value={aggregation} onValueChange={setAggregation}>
          <SelectTrigger id="aggregation">
            <SelectValue placeholder="Select aggregation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sum">Sum</SelectItem>
            <SelectItem value="average">Average</SelectItem>
            <SelectItem value="count">Count</SelectItem>
            <SelectItem value="min">Min</SelectItem>
            <SelectItem value="max">Max</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleAddMetric}>Add Metric</Button>
    </div>
  );
};

export default MetricSelector;
