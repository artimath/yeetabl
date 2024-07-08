import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface ThresholdCondition {
  id: string;
  metric: string;
  condition: 'greater' | 'less' | 'increase' | 'decrease';
  value: number;
  timeFrame: 'anytime' | '24h' | '7d';
}

interface ThresholdGroup {
  id: string;
  conditions: ThresholdCondition[];
  operator: 'AND' | 'OR';
}

export const ThresholdMonitor: React.FC = () => {
  const [thresholdGroups, setThresholdGroups] = useState<ThresholdGroup[]>([]);
  const [newCondition, setNewCondition] = useState<ThresholdCondition>({
    id: '',
    metric: '',
    condition: 'greater',
    value: 0,
    timeFrame: 'anytime',
  });

  const handleAddCondition = (groupId: string) => {
    if (newCondition.metric && newCondition.condition) {
      setThresholdGroups(groups =>
        groups.map(group =>
          group.id === groupId
            ? { ...group, conditions: [...group.conditions, { ...newCondition, id: Date.now().toString() }] }
            : group
        )
      );
      setNewCondition({ id: '', metric: '', condition: 'greater', value: 0, timeFrame: 'anytime' });
    }
  };

  const handleRemoveCondition = (groupId: string, conditionId: string) => {
    setThresholdGroups(groups =>
      groups.map(group =>
        group.id === groupId
          ? { ...group, conditions: group.conditions.filter(c => c.id !== conditionId) }
          : group
      )
    );
  };

  const handleAddGroup = () => {
    setThresholdGroups([...thresholdGroups, { id: Date.now().toString(), conditions: [], operator: 'AND' }]);
  };

  const handleRemoveGroup = (groupId: string) => {
    setThresholdGroups(groups => groups.filter(g => g.id !== groupId));
  };

  const handleChangeOperator = (groupId: string, operator: 'AND' | 'OR') => {
    setThresholdGroups(groups =>
      groups.map(group =>
        group.id === groupId ? { ...group, operator } : group
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threshold Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {thresholdGroups.map((group) => (
            <Card key={group.id}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Select value={group.operator} onValueChange={(value) => handleChangeOperator(group.id, value as 'AND' | 'OR')}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AND">AND</SelectItem>
                      <SelectItem value="OR">OR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" onClick={() => handleRemoveGroup(group.id)}>Remove Group</Button>
                </div>
                {group.conditions.map((condition) => (
                  <Card key={condition.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <span>
                        If {condition.metric} {condition.condition} {condition.value}
                        {condition.condition === 'increase' || condition.condition === 'decrease' ? '%' : ''} {condition.timeFrame}
                      </span>
                      <Button variant="destructive" onClick={() => handleRemoveCondition(group.id, condition.id)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                <div className="flex items-center space-x-2">
                  <Select value={newCondition.metric} onValueChange={(value) => setNewCondition({ ...newCondition, metric: value })}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily_active_users">Daily Active Users</SelectItem>
                      <SelectItem value="average_response_time">Average Response Time</SelectItem>
                      <SelectItem value="total_revenue">Total Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={newCondition.condition} onValueChange={(value) => setNewCondition({ ...newCondition, condition: value as ThresholdCondition['condition'] })}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="greater">is greater than</SelectItem>
                      <SelectItem value="less">is less than</SelectItem>
                      <SelectItem value="increase">% increase</SelectItem>
                      <SelectItem value="decrease">% decrease</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="number" value={newCondition.value} onChange={(e) => setNewCondition({ ...newCondition, value: parseFloat(e.target.value) })} className="w-[100px]" />
                  <Select value={newCondition.timeFrame} onValueChange={(value) => setNewCondition({ ...newCondition, timeFrame: value as ThresholdCondition['timeFrame'] })}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Time Frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anytime">at any time</SelectItem>
                      <SelectItem value="24h">for 24 hours</SelectItem>
                      <SelectItem value="7d">for 7 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => handleAddCondition(group.id)}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleAddGroup}>Add Threshold Group</Button>
        </div>
      </CardContent>
    </Card>
  );
};
