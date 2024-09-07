import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const RevenuePieChart = ({ ourShare, totalRevenue }) => {
  const data = [
    { name: 'Notre Part', value: parseFloat(ourShare) },
    { name: 'Part des restaurants', value: parseFloat(totalRevenue) - parseFloat(ourShare) }
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Répartition des Revenus</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={80} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenuePieChart;
