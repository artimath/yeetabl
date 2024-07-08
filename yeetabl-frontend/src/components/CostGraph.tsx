import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { events: 1, cost: 0 },
  { events: 10000, cost: 0 },
  { events: 100000, cost: 0 },
  { events: 1000000, cost: 11 },
  { events: 10000000, cost: 110 },
  { events: 100000000, cost: 1100 },
  { events: 1000000000, cost: 16500 },
];

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
            scale="log"
            domain={['auto', 'auto']}
            tickFormatter={(value) => value.toExponential()}
          />
          <YAxis />
          <Tooltip
            formatter={(value, name, props) => [`$${value}`, 'Estimated Cost']}
            labelFormatter={(value) => `${value.toExponential()} events per day`}
          />
          <Line type="monotone" dataKey="cost" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostGraph;
