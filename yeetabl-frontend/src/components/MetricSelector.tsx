import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../lib/utils"
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
              id="metric"
            >
              {metricName
                ? dummyMetrics.find((metric) => metric.name === metricName)?.name
                : <span className="text-muted-foreground">Select metric...</span>}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search metric..." />
              <CommandEmpty>No metric found.</CommandEmpty>
              <CommandGroup>
                {dummyMetrics.map((metric) => (
                  <CommandItem
                    key={metric.id}
                    onSelect={() => {
                      setMetricName(metric.name);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        metricName === metric.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {metric.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
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
      <Button onClick={handleAddMetric} aria-label="Add selected metric">Add Metric</Button>
    </form>
  );
};

export default MetricSelector;
