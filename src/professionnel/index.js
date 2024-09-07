import React from 'react';
// import DashboardNavbar from '../shared/dashboard-navbar';
// import Footer from '../shared/Foorter';
import { DashboardLayout } from '../shared/dashboard-layout';
// import { DashboardLayout } from '../shared/dashboard-layout';
// import {AdminProtectedRoute } from '../auth/ProtectedRoutes/AdminProtectedRoute'
import axios from "axios";
import { useEffect,useState } from 'react';
import StatCard from '../components/statCard';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
const ProfessionnelDashboard = () => {
  const userId = localStorage.getItem('id');
  const [stats, setStats] = useState([]);


  useEffect(() => {
    const fetchSuperAdmins = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/stats/${userId}/`
      );
      setStats(response.data.stats)
    };
    fetchSuperAdmins();
  }, []);


  return (
      <>
      <div className="pageTitleHeader">Bienvenue, Professionnel</div>
      <div className="pageTitleHeader"
      style={{fontSize:20,fontWeight:300,height:25}}>Ceci est votre tableau de bord professionnel.</div>
      <div
      style={{display:'flex',justifyContent:'space-between',gap:20,marginTop:20,padding:20}}>
      <StatCard name={'Total Orders'} value={stats.total_orders} icon={ListAltRoundedIcon}/>
      <StatCard name={'Total Revenues'} value={stats.total_revenue} icon={AccountBalanceRoundedIcon} money={true}/>
      <StatCard name={'Restaurant Shares'} value={stats.restaurant_share} icon={AccountBalanceWalletRoundedIcon} money={true}/>
      
      </div>
      <div
      style={{display:'flex',justifyContent:'space-between',gap:20,padding:20}}>
      
      <StatCard name={'Today Orders'} value={stats.today_orders} icon={ReceiptLongOutlinedIcon}/>
      <StatCard name={'Today Revenues'} value={stats.today_revenue} icon={EuroRoundedIcon} money={true}/>
      <StatCard name={'Monthly Revenues'} value={stats.monthly_revenue} icon={DateRangeRoundedIcon} money={true}/>
      
      </div>
      <div
      style={{display:'flex',justifyContent:'flex-start',padding:20}}>
      
     
      <StatCard name={'Anaual Revenues'} value={stats.annual_revenue} icon={CalendarMonthRoundedIcon} money={true}/>
      </div>
      
      
      </>
  );
};

// ProfessionnelDashboard.getLayout = (page) => (
//   <AdminProtectedRoute>
//     <DashboardLayout>
//       {page}
//     </DashboardLayout>
//   </AdminProtectedRoute>
// );

export default ProfessionnelDashboard;
