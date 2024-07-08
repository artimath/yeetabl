import React, { useState } from 'react';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

// Define types for our component
type Metric = {
  name: string;
  changeType: 'increase' | 'decrease';
  changeAmount: number;
  timePeriod: number; // in days
};

type CustomerSegment = {
  name: string;
  condition: string; // e.g., "MRR > 1000"
};

type IndexDefinition = {
  name: string;
  segment: CustomerSegment;
  metrics: Metric[];
  aggregationMethod: 'weighted_average' | 'sum';
  threshold: number;
  notificationMethod: 'email' | 'webhook';
};

const CustomerValueIndexBuilder: React.FC = () => {
  const [indexDefinition, setIndexDefinition] = useState<IndexDefinition>({
    name: '',
    segment: { name: '', condition: '' },
    metrics: [],
    aggregationMethod: 'weighted_average',
    threshold: 0,
    notificationMethod: 'email',
  });

  // Handler for updating the index definition
  const handleInputChange = (field: keyof IndexDefinition, value: any) => {
    setIndexDefinition((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for adding a new metric
  const addMetric = () => {
    setIndexDefinition((prev) => ({
      ...prev,
      metrics: [
        ...prev.metrics,
        { name: '', changeType: 'decrease', changeAmount: 0, timePeriod: 30 },
      ],
    }));
  };

  // Handler for updating a metric
  const updateMetric = (index: number, field: keyof Metric, value: any) => {
    setIndexDefinition((prev) => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) =>
        i === index ? { ...metric, [field]: value } : metric,
      ),
    }));
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the indexDefinition to your backend
    console.log('Submitted index definition:', indexDefinition);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="indexName">Index Name</label>
        <Input
          id="indexName"
          value={indexDefinition.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="e.g., High-Value Customer Churn Risk"
        />
      </div>

      <div>
        <h3>Customer Segment</h3>
        <Input
          value={indexDefinition.segment.name}
          onChange={(e) =>
            handleInputChange('segment', {
              ...indexDefinition.segment,
              name: e.target.value,
            })
          }
          placeholder="Segment Name (e.g., High-Value Customers)"
        />
        <Input
          value={indexDefinition.segment.condition}
          onChange={(e) =>
            handleInputChange('segment', {
              ...indexDefinition.segment,
              condition: e.target.value,
            })
          }
          placeholder="Condition (e.g., MRR > 1000)"
        />
      </div>

      <div>
        <h3>Metrics</h3>
        {indexDefinition.metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <Input
              value={metric.name}
              onChange={(e) => updateMetric(index, 'name', e.target.value)}
              placeholder="Metric Name"
            />
            <Select
              value={metric.changeType}
              onChange={(e) => updateMetric(index, 'changeType', e.target.value)}
            >
              <option value="increase">Increase</option>
              <option value="decrease">Decrease</option>
            </Select>
            <Input
              type="number"
              value={metric.changeAmount}
              onChange={(e) =>
                updateMetric(index, 'changeAmount', parseFloat(e.target.value))
              }
              placeholder="Change Amount (%)"
            />
            <Input
              type="number"
              value={metric.timePeriod}
              onChange={(e) =>
                updateMetric(index, 'timePeriod', parseInt(e.target.value))
              }
              placeholder="Time Period (days)"
            />
          </div>
        ))}
        <Button onClick={addMetric} type="button">
          Add Metric
        </Button>
      </div>

      <div>
        <h3>Aggregation Method</h3>
        <Select
          value={indexDefinition.aggregationMethod}
          onChange={(e) => handleInputChange('aggregationMethod', e.target.value)}
        >
          <option value="weighted_average">Weighted Average</option>
          <option value="sum">Sum of Scores</option>
        </Select>
      </div>

      <div>
        <h3>Threshold</h3>
        <Slider
          value={[indexDefinition.threshold]}
          onValueChange={(value) => handleInputChange('threshold', value[0])}
          max={100}
          step={1}
        />
      </div>

      <div>
        <h3>Notification Method</h3>
        <Select
          value={indexDefinition.notificationMethod}
          onChange={(e) => handleInputChange('notificationMethod', e.target.value)}
        >
          <option value="email">Email</option>
          <option value="webhook">Webhook</option>
        </Select>
      </div>

      <Button type="submit">Create Index</Button>
    </form>
  );
};

export default CustomerValueIndexBuilder;
