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
    <Card variant="outlined" style={{ borderRadius: 15 }}>
      <CardContent>
        <Typography variant="h6">Chiffre d'affaires</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barSize={45}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(3, 194, 190)" />   {/* Lighter blue at the top */}
                <stop offset="100%" stopColor="rgba(3, 162, 194, 1)" />  {/* Darker blue at the bottom */}
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="value" 
              fill="url(#colorBlue)"   // Reference the gradient
              radius={[10, 10, 0, 0]}  // Rounded corners
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueBarChart;
