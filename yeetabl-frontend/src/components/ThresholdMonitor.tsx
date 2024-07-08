import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

interface Threshold {
  id: string;
  metric: string;
  operator: '>' | '<' | '==' | '>=' | '<=';
  value: number;
}

export const ThresholdMonitor: React.FC = () => {
  const [thresholds, setThresholds] = useState<Threshold[]>([]);
  const [newThreshold, setNewThreshold] = useState<Threshold>({
    id: '',
    metric: '',
    operator: '>',
    value: 0,
  });

  const handleAddThreshold = () => {
    if (newThreshold.metric && newThreshold.operator) {
      setThresholds([...thresholds, { ...newThreshold, id: Date.now().toString() }]);
      setNewThreshold({ id: '', metric: '', operator: '>', value: 0 });
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
          <div className="flex space-x-2">
            <Select
              value={newThreshold.metric}
              onValueChange={(value) => setNewThreshold({ ...newThreshold, metric: value })}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily_active_users">Daily Active Users</SelectItem>
                <SelectItem value="average_response_time">Average Response Time</SelectItem>
                <SelectItem value="total_revenue">Total Revenue</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={newThreshold.operator}
              onValueChange={(value) => setNewThreshold({ ...newThreshold, operator: value as Threshold['operator'] })}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=">">{'>'}</SelectItem>
                <SelectItem value="<">{'<'}</SelectItem>
                <SelectItem value="==">{'=='}</SelectItem>
                <SelectItem value=">=">{'≥'}</SelectItem>
                <SelectItem value="<=">{'≤'}</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={newThreshold.value}
              onChange={(e) => setNewThreshold({ ...newThreshold, value: parseFloat(e.target.value) })}
              className="w-[100px]"
            />
            <Button onClick={handleAddThreshold}>Add Threshold</Button>
          </div>
          <div className="space-y-2">
            {thresholds.map((threshold) => (
              <Card key={threshold.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <span>
                    {threshold.metric} {threshold.operator} {threshold.value}
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
