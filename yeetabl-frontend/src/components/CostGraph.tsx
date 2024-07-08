import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { events: 0, cost: 0, batchedCost: 0 },
  { events: 100000, cost: 0, batchedCost: 0 },
  { events: 1000000, cost: 11 / 30, batchedCost: 5 / 30 },
  { events: 10000000, cost: 110 / 30, batchedCost: 50 / 30 },
  { events: 100000000, cost: 1100 / 30, batchedCost: 500 / 30 },
  { events: 500000000, cost: 8250 / 30, batchedCost: 3750.75 / 30 },
  { events: 1000000000, cost: 16500 / 30, batchedCost: 7501.50 / 30 },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
};

const CostGraph: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="events"
            type="number"
            scale="linear"
            domain={[0, 'dataMax']}
            tickFormatter={formatNumber}
            label={{ value: 'Events per day', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: 'Estimated Cost ($ per day)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            formatter={(value, name, props) => {
              const formattedValue = `$${Number(value).toFixed(4)}`;
              return [`${formattedValue} per day`, name];
            }}
            labelFormatter={(value) => `${formatNumber(value)} events per day`}
          />
          <Line type="monotone" dataKey="cost" stroke="#8884d8" activeDot={{ r: 8 }} name="Unbatched (cost per day)" />
          <Line type="monotone" dataKey="batchedCost" stroke="#82ca9d" activeDot={{ r: 8 }} name="Batched 2000 events (cost per day)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostGraph;
