import React from 'react';
// import DashboardNavbar from '../shared/dashboard-navbar';
// import Footer from '../shared/Foorter';
import { DashboardLayout } from '../shared/dashboard-layout';
// import { DashboardLayout } from '../shared/dashboard-layout';
// import {AdminProtectedRoute } from '../auth/ProtectedRoutes/AdminProtectedRoute'
import axios from "axios";
import { useEffect } from 'react';


const ProfessionnelDashboard = () => {
  const userId = localStorage.getItem('id');


  useEffect(() => {
    const fetchSuperAdmins = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/stats/${userId}/`
      );
      
    };
    fetchSuperAdmins();
  }, []);


  return (
      <DashboardLayout>
      <h1>Bienvenue, Professionnel</h1>
      <p>Ceci est votre tableau de bord professionnel.</p>
      </DashboardLayout>
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
