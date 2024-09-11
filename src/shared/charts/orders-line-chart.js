import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OrdersLineChart = ({ ordersData }) => {

  return (
    <Card variant="outlined"
    style={{borderRadius:15,boxShadow:
      "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",border:0,fontFamily:'Century Gothic'}}>
      <CardContent>
        <Typography variant="h6" style={{fontFamily:'Century Gothic' }}>Tendances des Commandes</Typography>
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
