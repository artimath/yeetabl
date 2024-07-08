import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

interface Threshold {
  id: string;
  metric: string;
  condition: 'greater' | 'less' | 'increase' | 'decrease';
  value: number;
  timeFrame: 'anytime' | '24h' | '7d';
}

export const ThresholdMonitor: React.FC = () => {
  const [thresholds, setThresholds] = useState<Threshold[]>([]);
  const [newThreshold, setNewThreshold] = useState<Threshold>({
    id: '',
    metric: '',
    condition: 'greater',
    value: 0,
    timeFrame: 'anytime',
  });

  const handleAddThreshold = () => {
    if (newThreshold.metric && newThreshold.condition) {
      setThresholds([...thresholds, { ...newThreshold, id: Date.now().toString() }]);
      setNewThreshold({ id: '', metric: '', condition: 'greater', value: 0, timeFrame: 'anytime' });
    }
  };

  const handleRemoveThreshold = (id: string) => {
    setThresholds(thresholds.filter((t) => t.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threshold Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="metric">Metric</Label>
              <Select
                value={newThreshold.metric}
                onValueChange={(value) => setNewThreshold({ ...newThreshold, metric: value })}
              >
                <SelectTrigger id="metric">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily_active_users">Daily Active Users</SelectItem>
                  <SelectItem value="average_response_time">Average Response Time</SelectItem>
                  <SelectItem value="total_revenue">Total Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={newThreshold.condition}
                onValueChange={(value) => setNewThreshold({ ...newThreshold, condition: value as Threshold['condition'] })}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater">is greater than</SelectItem>
                  <SelectItem value="less">is less than</SelectItem>
                  <SelectItem value="increase">% increase</SelectItem>
                  <SelectItem value="decrease">% decrease</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={newThreshold.value}
                onChange={(e) => setNewThreshold({ ...newThreshold, value: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="timeFrame">Time Frame</Label>
              <Select
                value={newThreshold.timeFrame}
                onValueChange={(value) => setNewThreshold({ ...newThreshold, timeFrame: value as Threshold['timeFrame'] })}
              >
                <SelectTrigger id="timeFrame">
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">at any time</SelectItem>
                  <SelectItem value="24h">for 24 hours</SelectItem>
                  <SelectItem value="7d">for 7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddThreshold}>Add Threshold</Button>
          <div className="space-y-2">
            {thresholds.map((threshold) => (
              <Card key={threshold.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <span>
                    If {threshold.metric} {threshold.condition} {threshold.value}
                    {threshold.condition === 'increase' || threshold.condition === 'decrease' ? '%' : ''} {threshold.timeFrame}
                  </span>
                  <Button variant="destructive" onClick={() => handleRemoveThreshold(threshold.id)}>
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
