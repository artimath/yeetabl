'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface NotificationLog {
  id: string;
  threshold: string;
  customer: string;
  notificationMethod: string;
  dateTime: string;
  metricTripped: string;
  thresholdCrossed: string;
  teamSize: number;
  usage: number;
  cost: number;
}

const mockLogs: NotificationLog[] = [
  {
    id: '1',
    threshold: 'High Usage',
    customer: 'Acme Corp',
    notificationMethod: 'Email',
    dateTime: '2023-06-01 14:30:00',
    metricTripped: 'Daily Active Users',
    thresholdCrossed: '> 1000',
    teamSize: 50,
    usage: 1200,
    cost: 5000,
  },
  {
    id: '2',
    threshold: 'Low Team Size',
    customer: 'TechStar',
    notificationMethod: 'Slack',
    dateTime: '2023-06-02 09:15:00',
    metricTripped: 'Team Members',
    thresholdCrossed: '< 10',
    teamSize: 8,
    usage: 500,
    cost: 2000,
  },
  {
    id: '3',
    threshold: 'Increased Cost',
    customer: 'DataDrive',
    notificationMethod: 'Webhook',
    dateTime: '2023-06-03 11:45:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '4',
    threshold: 'Service Downgrade',
    customer: 'CloudNine',
    notificationMethod: 'SMS',
    dateTime: '2023-06-04 16:20:00',
    metricTripped: 'Daily Active Users',
    thresholdCrossed: '> 1000',
    teamSize: 50,
    usage: 1200,
    cost: 5000,
  },
  {
    id: '5',
    threshold: 'High Usage',
    customer: 'InnovateCo',
    notificationMethod: 'Email',
    dateTime: '2023-06-05 10:00:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '6',
    threshold: 'Low Activity',
    customer: 'TechStar',
    notificationMethod: 'Slack',
    dateTime: '2023-06-05 13:30:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '7',
    threshold: 'Increased Cost',
    customer: 'Acme Corp',
    notificationMethod: 'Webhook',
    dateTime: '2023-06-06 09:45:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '8',
    threshold: 'Team Size Increase',
    customer: 'DataDrive',
    notificationMethod: 'Email',
    dateTime: '2023-06-06 14:15:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '9',
    threshold: 'Service Upgrade',
    customer: 'CloudNine',
    notificationMethod: 'SMS',
    dateTime: '2023-06-07 11:30:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '10',
    threshold: 'High Usage',
    customer: 'InnovateCo',
    notificationMethod: 'Slack',
    dateTime: '2023-06-07 16:00:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '11',
    threshold: 'Low Activity',
    customer: 'Acme Corp',
    notificationMethod: 'Email',
    dateTime: '2023-06-07 10:30:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '12',
    threshold: 'Increased Cost',
    customer: 'TechStar',
    notificationMethod: 'Webhook',
    dateTime: '2023-06-07 14:45:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '13',
    threshold: 'Team Size Decrease',
    customer: 'DataDrive',
    notificationMethod: 'SMS',
    dateTime: '2023-06-07 17:20:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '14',
    threshold: 'Service Downgrade',
    customer: 'CloudNine',
    notificationMethod: 'Slack',
    dateTime: '2023-06-07 09:00:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
  {
    id: '15',
    threshold: 'High Usage',
    customer: 'InnovateCo',
    notificationMethod: 'Email',
    dateTime: '2023-06-07 12:15:00',
    metricTripped: 'Monthly Cost',
    thresholdCrossed: '> $10,000',
    teamSize: 30,
    usage: 3000,
    cost: 12000,
  },
];

export const NotificationLogs: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Threshold</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Notification Method</TableHead>
              <TableHead>Date/Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLogs.map((log) => (
              <TooltipProvider key={log.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TableRow>
                      <TableCell>{log.threshold}</TableCell>
                      <TableCell>{log.customer}</TableCell>
                      <TableCell>{log.notificationMethod}</TableCell>
                      <TableCell>{log.dateTime}</TableCell>
                    </TableRow>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Metric Tripped: {log.metricTripped}</p>
                    <p>Threshold Crossed: {log.thresholdCrossed}</p>
                    <p>Team Size: {log.teamSize}</p>
                    <p>Usage: {log.usage}</p>
                    <p>Cost: ${log.cost}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
