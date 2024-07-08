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

interface MetricSelectorProps {
  onAddMetric: (metric: Metric) => void;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ onAddMetric }) => {
  const [metricName, setMetricName] = useState('');
  const [metricType, setMetricType] = useState<'event' | 'property'>('event');
  const [eventName, setEventName] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [aggregation, setAggregation] = useState('sum');

  const handleAddMetric = () => {
    if (metricName.trim()) {
      const newMetric: Metric = {
        id: Date.now().toString(),
        name: metricName.trim(),
        type: metricType,
        eventName: metricType === 'event' ? eventName : undefined,
        propertyName: metricType === 'property' ? propertyName : undefined,
        aggregation,
      };
      onAddMetric(newMetric);
      setMetricName('');
      setMetricType('event');
      setEventName('');
      setPropertyName('');
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
        <Label htmlFor="metricType">Metric Type</Label>
        <Select value={metricType} onValueChange={(value: 'event' | 'property') => setMetricType(value)}>
          <SelectTrigger id="metricType">
            <SelectValue placeholder="Select metric type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="property">Property</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {metricType === 'event' && (
        <div className="space-y-2">
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
          />
        </div>
      )}
      {metricType === 'property' && (
        <div className="space-y-2">
          <Label htmlFor="propertyName">Property Name</Label>
          <Input
            id="propertyName"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            placeholder="Enter property name"
          />
        </div>
      )}
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
