import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PlusCircle, MinusCircle } from 'lucide-react';
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
  items: (ThresholdCondition | ThresholdGroup)[];
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
      setThresholdGroups(groups => updateGroup(groups, groupId, group => ({
        ...group,
        items: [...group.items, { ...newCondition, id: Date.now().toString() }]
      })));
      setNewCondition({ id: '', metric: '', condition: 'greater', value: 0, timeFrame: 'anytime' });
    }
  };

  const handleRemoveCondition = (groupId: string, conditionId: string) => {
    setThresholdGroups(groups => updateGroup(groups, groupId, group => ({
      ...group,
      items: group.items.filter(item => 'metric' in item && item.id !== conditionId)
    })));
  };

  const handleAddGroup = (parentGroupId?: string) => {
    const newGroup: ThresholdGroup = { id: Date.now().toString(), items: [], operator: 'AND' };
    if (parentGroupId) {
      setThresholdGroups(groups => updateGroup(groups, parentGroupId, group => ({
        ...group,
        items: [...group.items, newGroup]
      })));
    } else {
      setThresholdGroups([...thresholdGroups, newGroup]);
    }
  };

  const handleRemoveGroup = (groupId: string, parentGroupId?: string) => {
    if (parentGroupId) {
      setThresholdGroups(groups => updateGroup(groups, parentGroupId, group => ({
        ...group,
        items: group.items.filter(item => !('operator' in item) || item.id !== groupId)
      })));
    } else {
      setThresholdGroups(groups => groups.filter(g => g.id !== groupId));
    }
  };

  const handleChangeOperator = (groupId: string, operator: 'AND' | 'OR') => {
    setThresholdGroups(groups => updateGroup(groups, groupId, group => ({ ...group, operator })));
  };

  const updateGroup = (groups: ThresholdGroup[], groupId: string, updateFn: (group: ThresholdGroup) => ThresholdGroup): ThresholdGroup[] => {
    return groups.map(group => {
      if (group.id === groupId) {
        return updateFn(group);
      }
      if ('items' in group) {
        return {
          ...group,
          items: updateGroup(group.items.filter(item => 'operator' in item) as ThresholdGroup[], groupId, updateFn)
        };
      }
      return group;
    });
  };

  const renderGroup = (group: ThresholdGroup, depth: number = 0, parentGroupId?: string) => (
    <Card key={group.id} className={`mt-4 ${depth > 0 ? 'ml-4' : ''}`}>
      <CardContent className="space-y-4 pt-4">
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
          <div>
            <Button variant="outline" onClick={() => handleAddGroup(group.id)} className="mr-2">
              Add Nested Group
            </Button>
            <Button variant="destructive" onClick={() => handleRemoveGroup(group.id, parentGroupId)}>
              Remove Group
            </Button>
          </div>
        </div>
        {group.items.map((item, index) => (
          <>
            {index > 0 && (
              <div className="text-center my-2 text-sm font-medium text-gray-500">
                {group.operator}
              </div>
            )}
            {'operator' in item ? (
              renderGroup(item, depth + 1, group.id)
            ) : (
              <Card key={item.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <span>
                    If {item.metric} {item.condition} {item.value}
                    {item.condition === 'increase' || item.condition === 'decrease' ? '%' : ''} {item.timeFrame}
                  </span>
                  <Button variant="destructive" onClick={() => handleRemoveCondition(group.id, item.id)}>
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
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
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threshold Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {thresholdGroups.map((group) => renderGroup(group))}
          <Button onClick={() => handleAddGroup()}>Add Threshold Group</Button>
        </div>
      </CardContent>
    </Card>
  );
};
