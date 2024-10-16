import React from 'react';
import axios from "axios";
import { useEffect,useState } from 'react';
import StatCard from '../components/statCard';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import { Typography, Box,Grid } from "@mui/material";
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import RevenueBarChart from '../shared/charts/revenue-bar-chart';
import RevenuePieChart from '../shared/charts/revenue-pie-chart';
import OrdersLineChart from '../shared/charts/orders-line-chart';

const ProfessionnelDashboard = () => {
  const userId = localStorage.getItem('id');
  const [stats, setStats] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isDeclined,setIsDeclined] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/profile/`,
          { admin_id: userId }
        );
        setIsVerified(response.data.is_verified);
        setIsDeclined(response.data.is_declined);
        setLoading(false);

      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    const fetchSuperAdmins = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/stats/${userId}/`
      );
      setStats(response.data.stats)
    };
    fetchSuperAdmins();
  }, [isVerified, userId]);

  if (loading) {
    return null; 
  }
  
  if (!isVerified && !isDeclined ) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 15px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
            maxWidth: "700px",
            width: "100%",
            position: "relative",
            marginLeft: "20%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "4rem",
              color: "orange",
            }}
          >
            ⏳
          </Box>
          <Typography
            variant="h4"
            color="text.primary"
            fontWeight="bold"
            mt={4}
          >
            Veuillez patienter
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            Votre compte est en cours de vérification par les administrateurs.
            Veuillez patienter, cela ne devrait pas tarder.
          </Typography>
        </Box>
      </Box>
    );
  }

  if (isDeclined) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 15px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
            maxWidth: "700px",
            width: "100%",
            position: "relative",
            marginLeft: "20%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "4rem",
              color: "red",
            }}
          >
            < ReportProblemRoundedIcon style={{ fontSize: 80 }}/>
          </Box>
          <Typography
            variant="h4"
            color="text.primary"
            fontWeight="bold"
            mt={4}
          >
            Adhésion Refusée
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            Votre compte a été refusé par les modérateurs de l'application.
            Pour envoyer une demande d'opposition à cette décision, veuillez nous contacter via notre email de contact : contact.saveserve@gmail.com
            Une réponse va vous être délivrée sous 5 jours.
          </Typography>
        </Box>
      </Box>
    );
  }
  return (
      <>
      <div className="pageTitleHeader">Tableau De Bord</div>
      {/* <div className="pageTitleHeader"
      style={{fontSize:20,fontWeight:300,height:25}}>Ceci est votre tableau de bord professionnel.</div> */}
      <div
      style={{display:'flex',justifyContent:'space-between',gap:20,marginTop:20,padding:20}}>
      <StatCard name={'Total des commandes'} value={stats.total_orders} icon={ListAltRoundedIcon}/>
      <StatCard name={'Chiffre d\'affaires total'} value={stats.total_revenue} icon={AccountBalanceRoundedIcon} money={true}/>
      <StatCard name={'Part du restaurant'} value={stats.restaurant_share} icon={AccountBalanceWalletRoundedIcon} money={true}/>
      
      </div>
      <div
      style={{display:'flex',justifyContent:'space-between',gap:20,padding:20}}>
      
      {/* <StatCard name={'Commandes du jour'} value={stats.today_orders} icon={ReceiptLongOutlinedIcon}/> */}
      <StatCard name={'Revenus d\'aujourd\'hui'} value={stats.today_revenue} icon={EuroRoundedIcon} money={true}/>
      <StatCard name={'Revenus mensuels'} value={stats.monthly_revenue} icon={DateRangeRoundedIcon} money={true}/>
      <StatCard name={'Chiffre d\'affaires annuel'} value={stats.annual_revenue} icon={CalendarMonthRoundedIcon} money={true}/>
      
      </div>
      {/* <div
      style={{display:'flex',justifyContent:'flex-start',padding:20}}>
      
     
      <StatCard name={'Chiffre d\'affaires annuel'} value={stats.annual_revenue} icon={CalendarMonthRoundedIcon} money={true}/>
      </div> */}
      <Grid container spacing={3}
      style={{padding:20}}>
        <Grid item xs={12} md={6}>
          <RevenueBarChart monthlyRevenue={stats.monthly_revenue} annualRevenue={stats.annual_revenue} todayRevenue={stats.today_revenue} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RevenuePieChart ourShare={stats.restaurant_share} totalRevenue={stats.total_revenue} />
        </Grid>
        {/* <Grid item xs={12}>
          <OrdersLineChart ordersData={ordersData} />
        </Grid> */}
      </Grid>
      
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
