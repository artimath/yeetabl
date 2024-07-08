'use client';

import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DemoLineChartProps {
  data: Array<{ date: Date; value: number }>;
}

export const DemoLineChart: React.FC<DemoLineChartProps> = ({ data }) => {
  const formatXAxis = (tickItem: Date) => {
    return tickItem.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatXAxis}
          angle={-45}
          textAnchor="end"
          height={50}
        />
        <YAxis />
        <Tooltip 
          labelFormatter={(label: Date) => label.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};
