import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import StatCard from '../components/statCard';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import RevenueBarChart from '../shared/charts/revenue-bar-chart';
import RevenuePieChart from '../shared/charts/revenue-pie-chart';
import OrdersLineChart from '../shared/charts/orders-line-chart';
import { Grid } from '@mui/material';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchSuperAdmins = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/superadmin/stats/`);
      setStats(response.data.stats);
      const ordersResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/superadmin/orders-trends/`);
      setOrdersData(ordersResponse.data.orders_data);

      // Example data fetching for orders trends
      // Modify this according to your actual API and data
      // const ordersResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/superadmin/orders-trends/`);
      // setOrdersData(ordersResponse.data);
    };
    fetchSuperAdmins();
  }, []);

  return (
    <>
      <div className="pageTitleHeader">Tableau De Bord</div>
      <div
      style={{display:'flex',justifyContent:'space-between',gap:20,marginTop:20,padding:20}}>
      <StatCard name={'Total des commandes'} value={stats.total_orders} icon={ListAltRoundedIcon}/>
      <StatCard name={'Chiffre d\'affaires total'} value={stats.total_revenue} icon={AccountBalanceRoundedIcon} money={true}/>
      <StatCard name={'Notre Part'} value={stats.our_share} icon={AccountBalanceWalletRoundedIcon} money={true}/>
      </div>
      <div
      style={{display:'flex',justifyContent:'space-between',gap:20,padding:20}}>
      
      <StatCard name={'Commandes du jour'} value={stats.today_orders} icon={ReceiptLongOutlinedIcon}/>
      <StatCard name={'Revenus d\'aujourd\'hui'} value={stats.today_revenue} icon={EuroRoundedIcon} money={true}/>
      <StatCard name={'Revenus mensuels'} value={stats.monthly_revenue} icon={DateRangeRoundedIcon} money={true}/>
      
      </div>
      <div
      style={{display:'flex',justifyContent:'flex-start',padding:20}}>
      
     
      <StatCard name={'Chiffre d\'affaires annuel'} value={stats.annual_revenue} icon={CalendarMonthRoundedIcon} money={true}/>
      </div>


      <Grid container spacing={3}  style={{padding:20}}>
        <Grid item xs={12} md={6}>
          <RevenueBarChart monthlyRevenue={stats.monthly_revenue} annualRevenue={stats.annual_revenue} todayRevenue={stats.today_revenue} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RevenuePieChart ourShare={stats.our_share} totalRevenue={stats.total_revenue} />
        </Grid>
        <Grid item xs={12}>
          <OrdersLineChart ordersData={ordersData} />
        </Grid>
      </Grid>
    </>
  );
};

export default SuperAdminDashboard;
