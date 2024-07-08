import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  const [metricName, setMetricName] = useState('');
  const [aggregation, setAggregation] = useState('count');
  const [timePeriod, setTimePeriod] = useState('7d');

  const handleAddMetric = () => {
    if (metricName) {
      const newMetric: Metric = {
        id: Date.now().toString(),
        name: metricName,
        aggregation,
        timePeriod,
      };
      onAddMetric(newMetric);
      setMetricName('');
      setAggregation('count');
      setTimePeriod('7d');
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <fieldset className="flex items-center space-x-2">
        <legend className="sr-only">Metric Selection</legend>
        <Label htmlFor="aggregation">IF</Label>
        <Select value={aggregation} onValueChange={setAggregation}>
          <SelectTrigger className="w-[100px]" id="aggregation">
            <SelectValue placeholder="Select aggregation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="count">COUNT</SelectItem>
            <SelectItem value="sum">SUM</SelectItem>
            <SelectItem value="average">AVERAGE</SelectItem>
            <SelectItem value="min">MIN</SelectItem>
            <SelectItem value="max">MAX</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="metric">of</Label>
        <Select value={metricName} onValueChange={setMetricName}>
          <SelectTrigger className="w-[200px]" id="metric">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            {dummyMetrics.map((metric) => (
              <SelectItem key={metric.id} value={metric.name}>
                <div className="flex items-center">
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      metricName === metric.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {metric.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label htmlFor="timePeriod">in a</Label>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[100px]" id="timePeriod">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">1 DAY</SelectItem>
            <SelectItem value="7d">7 DAY</SelectItem>
            <SelectItem value="30d">30 DAY</SelectItem>
            <SelectItem value="90d">90 DAY</SelectItem>
          </SelectContent>
        </Select>
        <Label>PERIOD</Label>
      </fieldset>
      <Button onClick={handleAddMetric} aria-label="Add selected metric">
        Add Metric
      </Button>
    </form>
  );
};

export default MetricSelector;
