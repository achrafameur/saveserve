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

// const SuperAdminDashboard = () => {
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     const fetchSuperAdmins = async () => {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/superadmin/stats/`
//       );
//       setStats(response.data.stats)
//     };
//     fetchSuperAdmins();
//   }, []);
//   return (
//     <>
//       <div className="pageTitleHeader">Bienvenue, Professionnel</div>
//       {/* <div className="pageTitleHeader"
//       style={{fontSize:20,fontWeight:300,height:25}}>Ceci est votre tableau de bord professionnel.</div> */}
//       <div
//       style={{display:'flex',justifyContent:'space-between',gap:20,marginTop:20,padding:20}}>
//       <StatCard name={'Total Orders'} value={stats.total_orders} icon={ListAltRoundedIcon}/>
//       <StatCard name={'Total Revenues'} value={stats.total_revenue} icon={AccountBalanceRoundedIcon} money={true}/>
//       <StatCard name={'Our Shares'} value={stats.our_share} icon={AccountBalanceWalletRoundedIcon} money={true}/>
      
//       </div>
//       <div
//       style={{display:'flex',justifyContent:'space-between',gap:20,padding:20}}>
      
//       <StatCard name={'Today Orders'} value={stats.today_orders} icon={ReceiptLongOutlinedIcon}/>
//       <StatCard name={'Today Revenues'} value={stats.today_revenue} icon={EuroRoundedIcon} money={true}/>
//       <StatCard name={'Monthly Revenues'} value={stats.monthly_revenue} icon={DateRangeRoundedIcon} money={true}/>
      
//       </div>
//       <div
//       style={{display:'flex',justifyContent:'flex-start',padding:20}}>
      
     
//       <StatCard name={'Anaual Revenues'} value={stats.annual_revenue} icon={CalendarMonthRoundedIcon} money={true}/>
//       </div>
      
      
//       </>
//   );
// };

// export default SuperAdminDashboard;

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
      <div className="pageTitleHeader">Bienvenue, Admin</div>
      {/* <div style={{display:'flex',justifyContent:'space-between',gap:20,marginTop:20,padding:20}}>
        <StatCard name={'Total Orders'} value={stats.total_orders} icon={ListAltRoundedIcon}/>
        <StatCard name={'Total Revenues'} value={stats.total_revenue} icon={AccountBalanceRoundedIcon} money={true}/>
        <StatCard name={'Our Shares'} value={stats.our_share} icon={AccountBalanceWalletRoundedIcon} money={true}/>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',gap:20,padding:20}}>
        <StatCard name={'Today Orders'} value={stats.today_orders} icon={ReceiptLongOutlinedIcon}/>
        <StatCard name={'Today Revenues'} value={stats.today_revenue} icon={EuroRoundedIcon} money={true}/>
        <StatCard name={'Monthly Revenues'} value={stats.monthly_revenue} icon={DateRangeRoundedIcon} money={true}/>
      </div>
      <div style={{display:'flex',justifyContent:'flex-start',padding:20}}>
        <StatCard name={'Annual Revenues'} value={stats.annual_revenue} icon={CalendarMonthRoundedIcon} money={true}/>
      </div> */}
      {/* <RevenueBarChart monthlyRevenue={stats.monthly_revenue} annualRevenue={stats.annual_revenue} />
      <RevenuePieChart ourShare={stats.our_share} totalRevenue={stats.total_revenue} />
      <OrdersLineChart ordersData={ordersData} /> */}
      <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <RevenueBarChart monthlyRevenue={stats.monthly_revenue} annualRevenue={stats.annual_revenue} todayRevenue={stats.today_revenue}/>
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
