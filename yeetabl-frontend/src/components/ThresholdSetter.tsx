import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Metric {
  id: string;
  name: string;
  type: 'event' | 'property';
  eventName?: string;
  propertyName?: string;
  aggregation: string;
}

interface Threshold {
  metricId: string;
  operator: '>' | '<' | '==' | '>=' | '<=';
  value: number;
}

interface ThresholdSetterProps {
  metrics: Metric[];
  onSetThreshold: (threshold: Threshold) => void;
}

const ThresholdSetter: React.FC<ThresholdSetterProps> = ({ metrics, onSetThreshold }) => {
  const [selectedMetricId, setSelectedMetricId] = useState('');
  const [operator, setOperator] = useState<'>' | '<' | '==' | '>=' | '<='>('>=');
  const [value, setValue] = useState('');

  const handleSetThreshold = () => {
    if (selectedMetricId && value) {
      onSetThreshold({
        metricId: selectedMetricId,
        operator,
        value: parseFloat(value),
      });
      setSelectedMetricId('');
      setOperator('>=');
      setValue('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="metric">Metric</Label>
        <Select value={selectedMetricId} onValueChange={setSelectedMetricId}>
          <SelectTrigger id="metric">
            <SelectValue placeholder="Select a metric" />
          </SelectTrigger>
          <SelectContent>
            {metrics.map((metric) => (
              <SelectItem key={metric.id} value={metric.id}>
                {metric.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="operator">Operator</Label>
        <Select value={operator} onValueChange={(value: '>' | '<' | '==' | '>=' | '<=') => setOperator(value)}>
          <SelectTrigger id="operator">
            <SelectValue placeholder="Select an operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=">">Greater than</SelectItem>
            <SelectItem value="<">Less than</SelectItem>
            <SelectItem value="==">Equal to</SelectItem>
            <SelectItem value=">=">Greater than or equal to</SelectItem>
            <SelectItem value="<=">Less than or equal to</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="value">Threshold Value</Label>
        <Input
          id="value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter threshold value"
        />
      </div>
      <Button onClick={handleSetThreshold}>Set Threshold</Button>
    </div>
  );
};

export default ThresholdSetter;
