import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { dummyMetrics } from '../dummyData';

interface Metric {
  id: string;
  name: string;
  aggregation: string;
  timePeriod: string;
}

interface MetricSelectorProps {
  onAddMetric: (metric: Metric) => void;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ onAddMetric }) => {
  const [metricName, setMetricName] = useState('');
  const [aggregation, setAggregation] = useState('sum');
  const [timePeriod, setTimePeriod] = useState('24h');

  const handleAddMetric = () => {
    if (metricName.trim()) {
      const newMetric: Metric = {
        id: Date.now().toString(),
        name: metricName.trim(),
        aggregation,
        timePeriod,
      };
      onAddMetric(newMetric);
      setMetricName('');
      setAggregation('sum');
      setTimePeriod('24h');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label>Show me the</Label>
        <Select value={aggregation} onValueChange={setAggregation}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select aggregation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sum">SUM</SelectItem>
            <SelectItem value="average">AVERAGE</SelectItem>
            <SelectItem value="count">COUNT</SelectItem>
            <SelectItem value="min">MIN</SelectItem>
            <SelectItem value="max">MAX</SelectItem>
          </SelectContent>
        </Select>
        <Label>of</Label>
        <Input
          className="w-[200px]"
          value={metricName}
          onChange={(e) => setMetricName(e.target.value)}
          placeholder="Enter metric name"
          list="metricNames"
        />
        <datalist id="metricNames">
          {dummyMetrics.map((metric) => (
            <option key={metric.id} value={metric.name} />
          ))}
        </datalist>
        <Label>in the last</Label>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">1 hour</SelectItem>
            <SelectItem value="24h">24 hours</SelectItem>
            <SelectItem value="7d">7 days</SelectItem>
            <SelectItem value="30d">30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleAddMetric}>Add Metric</Button>
    </div>
  );
};

export default MetricSelector;
