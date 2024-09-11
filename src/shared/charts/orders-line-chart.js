import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OrdersLineChart = ({ ordersData }) => {

  return (
    <Card variant="outlined"
    style={{borderRadius:15}}>
      <CardContent>
        <Typography variant="h6">Tendances des Commandes</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="rgb(6, 174, 212)" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OrdersLineChart;
