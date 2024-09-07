import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const RevenueBarChart = ({ monthlyRevenue, annualRevenue, todayRevenue }) => {
  const data = [
    { name: ' CA d\'aujourd\'hui', value: parseFloat(todayRevenue) },
    { name: 'CA mensuel', value: parseFloat(monthlyRevenue) },
    { name: 'CA annuel', value: parseFloat(annualRevenue) }
  ];

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Chiffre d'affaires</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueBarChart;
