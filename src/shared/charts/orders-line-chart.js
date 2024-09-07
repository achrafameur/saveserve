import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OrdersLineChart = ({ ordersData }) => {

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Tendances des Commandes</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OrdersLineChart;
