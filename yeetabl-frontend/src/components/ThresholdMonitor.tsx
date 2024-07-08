'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { PlusCircle, MinusCircle, Link } from 'lucide-react';
import { toast } from './ui/use-toast';
import { NotificationManager } from './NotificationManager';

interface Notification {
  id: string;
  type: 'webhook' | 'email' | 'slack';
  destination: string;
}

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

/**
 * Threshold Configuration Schema
 *
 * {
 *   id: string,
 *   name: string,
 *   description: string,
 *   rootGroup: ThresholdGroup,
 *   notifications: Notification[],
 *   createdAt: string (ISO 8601 date),
 *   updatedAt: string (ISO 8601 date)
 * }
 *
 * ThresholdGroup: {
 *   id: string,
 *   operator: 'AND' | 'OR',
 *   items: (ThresholdCondition | ThresholdGroup)[]
 * }
 *
 * ThresholdCondition: {
 *   id: string,
 *   metric: string,
 *   condition: 'greater' | 'less' | 'increase' | 'decrease',
 *   value: number,
 *   timeFrame: 'anytime' | '24h' | '7d'
 * }
 */

export const ThresholdMonitor: React.FC = () => {
  const [thresholdGroups, setThresholdGroups] = useState<ThresholdGroup[]>([]);
  const [newCondition, setNewCondition] = useState<ThresholdCondition>({
    id: '',
    metric: '',
    condition: 'greater',
    value: '',
    timeFrame: 'anytime',
  });
  const [thresholdName, setThresholdName] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [savedThresholds, setSavedThresholds] = useState<any[]>([
    {
      id: 'complex-threshold',
      name: 'Complex Team and Cost Threshold',
      description: 'Users in team and volume OR team under 20 and over 7500 dollars',
      rootGroup: {
        id: 'root',
        operator: 'OR',
        items: [
          {
            id: 'group1',
            operator: 'AND',
            items: [
              {
                id: 'condition1',
                metric: 'users_in_team',
                condition: 'greater',
                value: 30,
                timeFrame: 'anytime',
              },
              {
                id: 'condition2',
                metric: 'usage_volume',
                condition: 'greater',
                value: 50000,
                timeFrame: 'anytime',
              },
            ],
          },
          {
            id: 'group2',
            operator: 'AND',
            items: [
              {
                id: 'condition3',
                metric: 'users_in_team',
                condition: 'less',
                value: 20,
                timeFrame: 'anytime',
              },
              {
                id: 'condition4',
                metric: 'monthly_cost',
                condition: 'greater',
                value: 7500,
                timeFrame: 'anytime',
              },
            ],
          },
        ],
      },
      notifications: [
        { id: 'webhook1', type: 'webhook', destination: 'https://example.com/endpoint' },
        { id: 'email1', type: 'email', destination: 'example@email.com' },
        { id: 'slack1', type: 'slack', destination: 'Customer Success Channel' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [editingThreshold, setEditingThreshold] = useState<any | null>(null);

  const handleEditThreshold = (threshold: any) => {
    const flattenGroup = (group: ThresholdGroup): ThresholdGroup => ({
      ...group,
      items: group.items.map((item) => ('operator' in item ? flattenGroup(item) : item)),
    });

    setThresholdGroups([flattenGroup(threshold.rootGroup)]);
    setThresholdName(threshold.name);
    setNotifications(threshold.notifications || []);
    setIsCreating(true);
    setEditingThreshold(threshold);
    setNewCondition({
      id: '',
      metric: '',
      condition: 'greater',
      value: 0,
      timeFrame: 'anytime',
    });
  };

  const saveThreshold = () => {
    if (thresholdGroups.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one threshold condition before saving.',
        variant: 'destructive',
      });
      return;
    }

    if (!thresholdName) {
      toast({
        title: 'Error',
        description: 'Please provide a name for the threshold.',
        variant: 'destructive',
      });
      return;
    }

    const thresholdConfig = {
      id: editingThreshold ? editingThreshold.id : Date.now().toString(),
      name: thresholdName,
      description: 'User-defined threshold',
      rootGroup: thresholdGroups[0],
      notifications: notifications,
      createdAt: editingThreshold ? editingThreshold.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Here you would typically send this to your backend API
    console.log('Saving threshold:', thresholdConfig);

    // Add or update the threshold in the savedThresholds array
    setSavedThresholds((prevThresholds) => {
      if (editingThreshold) {
        return prevThresholds.map((t) =>
          t.id === editingThreshold.id ? thresholdConfig : t,
        );
      } else {
        return [...prevThresholds, thresholdConfig];
      }
    });

    toast({
      title: 'Success',
      description: 'Threshold saved successfully!',
    });

    // Reset the form
    setThresholdGroups([]);
    setThresholdName('');
    setNotifications([]);
    setIsCreating(false);
    setEditingThreshold(null);
  };

  const renderGroupSummary = (group: ThresholdGroup): React.ReactNode => {
    return (
      <>
        {group.items.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && ` ${group.operator} `}
            {'metric' in item ? (
              <>
                {item.metric} {item.metric === 'service_type' ? 'is' : item.condition}{' '}
                {item.metric === 'service_type' ? (
                  <strong>{item.value}</strong>
                ) : (
                  <>
                    <strong>
                      {item.metric === 'monthly_cost' ? '$' : ''}
                      {item.value}
                      {item.condition === 'increase' || item.condition === 'decrease'
                        ? '%'
                        : ''}
                    </strong>
                  </>
                )}{' '}
                {item.timeFrame !== 'anytime' && item.timeFrame}
              </>
            ) : (
              <span>({renderGroupSummary(item)})</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const handleAddCondition = (groupId: string) => {
    if (newCondition.metric && newCondition.condition) {
      setThresholdGroups((groups) =>
        updateGroup(groups, groupId, (group) => ({
          ...group,
          items: [...group.items, { ...newCondition, id: Date.now().toString() }],
        })),
      );
      setNewCondition({
        id: '',
        metric: '',
        condition: 'greater',
        value: 0,
        timeFrame: 'anytime',
      });
    }
  };

  const handleRemoveCondition = (groupId: string, conditionId: string) => {
    setThresholdGroups((groups) =>
      updateGroup(groups, groupId, (group) => ({
        ...group,
        items: group.items.filter((item) => 'metric' in item && item.id !== conditionId),
      })),
    );
  };

  const handleAddGroup = (parentGroupId?: string) => {
    const newGroup: ThresholdGroup = {
      id: Date.now().toString(),
      items: [],
      operator: 'AND',
    };
    if (parentGroupId) {
      setThresholdGroups((groups) =>
        updateGroup(groups, parentGroupId, (group) => ({
          ...group,
          items: [...group.items, newGroup],
        })),
      );
    } else {
      setThresholdGroups([...thresholdGroups, newGroup]);
    }
  };

  const handleRemoveGroup = (groupId: string, parentGroupId?: string) => {
    if (parentGroupId) {
      setThresholdGroups((groups) =>
        updateGroup(groups, parentGroupId, (group) => ({
          ...group,
          items: group.items.filter(
            (item) => !('operator' in item) || item.id !== groupId,
          ),
        })),
      );
    } else {
      setThresholdGroups((groups) => groups.filter((g) => g.id !== groupId));
    }
  };

  const generateDummyCustomers = () => {
    const customers = [];
    const names = ['Acme Corp', 'TechStar', 'InnovateCo', 'DataDrive', 'CloudNine'];
    for (let i = 0; i < 5; i++) {
      customers.push({
        name: names[i],
        teamSize: Math.floor(Math.random() * 50) + 10,
        usage: Math.floor(Math.random() * 1000) + 100,
        monthlyCost: Math.floor(Math.random() * 10000) + 1000,
      });
    }
    return customers;
  };

  const handleUpdateCondition = (
    groupId: string,
    conditionId: string,
    field: string,
    value: any,
  ) => {
    setThresholdGroups((groups) =>
      updateGroup(groups, groupId, (group) => ({
        ...group,
        items: group.items.map((item) =>
          'metric' in item && item.id === conditionId
            ? { ...item, [field]: value }
            : item,
        ),
      })),
    );
  };

  const handleChangeOperator = (groupId: string, operator: 'AND' | 'OR') => {
    setThresholdGroups((groups) =>
      updateGroup(groups, groupId, (group) => ({ ...group, operator })),
    );
  };

  const updateGroup = (
    groups: ThresholdGroup[],
    groupId: string,
    updateFn: (group: ThresholdGroup) => ThresholdGroup,
  ): ThresholdGroup[] => {
    return groups.map((group) => {
      if (group.id === groupId) {
        return updateFn(group);
      }
      if ('items' in group) {
        return {
          ...group,
          items: updateGroup(
            group.items.filter((item) => 'operator' in item) as ThresholdGroup[],
            groupId,
            updateFn,
          ),
        };
      }
      return group;
    });
  };

  const renderGroup = (
    group: ThresholdGroup,
    depth: number = 0,
    parentGroupId?: string,
  ) => (
    <Card key={group.id} className={`mt-4 ${depth > 0 ? 'ml-4' : ''}`}>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <Select
            value={group.operator}
            onValueChange={(value) =>
              handleChangeOperator(group.id, value as 'AND' | 'OR')
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Button
              variant="outline"
              onClick={() => handleAddGroup(group.id)}
              className="mr-2"
            >
              Add Nested Group
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleRemoveGroup(group.id, parentGroupId)}
            >
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
                  <div className="flex items-center space-x-2">
                    <Select
                      value={item.metric}
                      onValueChange={(value) =>
                        handleUpdateCondition(group.id, item.id, 'metric', value)
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily_active_users">
                          Daily Active Users
                        </SelectItem>
                        <SelectItem value="average_response_time">
                          Average Response Time
                        </SelectItem>
                        <SelectItem value="total_revenue">Total Revenue</SelectItem>
                        <SelectItem value="users_in_team">Users in Team</SelectItem>
                        <SelectItem value="usage_volume">
                          Usage Volume (gb-hrs)
                        </SelectItem>
                        <SelectItem value="monthly_cost">Monthly Cost</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={item.condition}
                      onValueChange={(value) =>
                        handleUpdateCondition(group.id, item.id, 'condition', value)
                      }
                    >
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
                    <Input
                      type="number"
                      value={item.value}
                      onChange={(e) =>
                        handleUpdateCondition(
                          group.id,
                          item.id,
                          'value',
                          parseFloat(e.target.value),
                        )
                      }
                      className="w-[100px]"
                    />
                    <Select
                      value={item.timeFrame}
                      onValueChange={(value) =>
                        handleUpdateCondition(group.id, item.id, 'timeFrame', value)
                      }
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Time Frame" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anytime">at any time</SelectItem>
                        <SelectItem value="24h">for 24 hours</SelectItem>
                        <SelectItem value="7d">for 7 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveCondition(group.id, item.id)}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        ))}
        <div className="flex items-center space-x-2">
          <Select
            value={newCondition.metric}
            onValueChange={(value) => setNewCondition({ ...newCondition, metric: value })}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily_active_users">Daily Active Users</SelectItem>
              <SelectItem value="average_response_time">Average Response Time</SelectItem>
              <SelectItem value="total_revenue">Total Revenue</SelectItem>
              <SelectItem value="users_in_team">Users in Team</SelectItem>
              <SelectItem value="usage_volume">Usage Volume (gb-hrs)</SelectItem>
              <SelectItem value="monthly_cost">Monthly Cost</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newCondition.condition}
            onValueChange={(value) =>
              setNewCondition({
                ...newCondition,
                condition: value as ThresholdCondition['condition'],
              })
            }
          >
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
          <Input
            type="number"
            value={newCondition.value}
            onChange={(e) =>
              setNewCondition({ ...newCondition, value: parseFloat(e.target.value) })
            }
            className="w-[100px]"
          />
          <Select
            value={newCondition.timeFrame}
            onValueChange={(value) =>
              setNewCondition({
                ...newCondition,
                timeFrame: value as ThresholdCondition['timeFrame'],
              })
            }
          >
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
      <CardContent className="mt-6">
        {savedThresholds.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Saved Thresholds</h3>
            {savedThresholds.map((threshold) => (
              <Card key={threshold.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{threshold.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex">
                    <div className="w-1/2 pr-4">
                      <p>{renderGroupSummary(threshold.rootGroup)}</p>
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2">Notifications:</h4>
                        <ul>
                          {threshold.notifications.map((notification) => (
                            <li key={notification.id}>
                              {notification.type}: {notification.destination}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleEditThreshold(threshold)}
                        className="mt-4"
                      >
                        Edit Threshold
                      </Button>
                    </div>
                    <div className="w-1/2 pl-4">
                      <h4 className="text-lg font-semibold mb-2">
                        Customers That Hit Threshold Last 7 Days:
                      </h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Team Size</TableHead>
                            <TableHead>Usage (gb-hrs)</TableHead>
                            <TableHead>Monthly Cost</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {generateDummyCustomers().map((customer, index) => (
                            <TableRow key={index}>
                              <TableCell>{customer.name}</TableCell>
                              <TableCell>{customer.teamSize}</TableCell>
                              <TableCell>{customer.usage}</TableCell>
                              <TableCell>${customer.monthlyCost}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="space-y-4">
          {isCreating ? (
            <>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Threshold Name"
                  value={thresholdName}
                  onChange={(e) => setThresholdName(e.target.value)}
                  className="flex-grow"
                />
                <Button
                  onClick={saveThreshold}
                  disabled={thresholdGroups.length === 0 || !thresholdName}
                >
                  Save Threshold
                </Button>
              </div>
              {thresholdGroups.map((group) => renderGroup(group))}
              {thresholdGroups.length > 0 && (
                <div className="bg-gray-800 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-gray-200">
                    Current Query Summary:
                  </h3>
                  <p className="text-gray-300">
                    {thresholdGroups.map((group, groupIndex) => (
                      <span key={group.id}>
                        {groupIndex > 0 && ` OR `}({renderGroupSummary(group)})
                      </span>
                    ))}
                  </p>
                </div>
              )}
              <Button onClick={() => handleAddGroup()}>Add Threshold Group</Button>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Notifications</h3>
                <NotificationManager
                  notifications={notifications}
                  onNotificationsChange={setNotifications}
                />
              </div>
            </>
          ) : (
            <Button onClick={() => setIsCreating(true)}>Create New Threshold</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
