import React from 'react';
// import DashboardNavbar from '../shared/dashboard-navbar';
// import Footer from '../shared/Foorter';
import { DashboardLayout } from '../shared/dashboard-layout';
// import { DashboardLayout } from '../shared/dashboard-layout';
// import {AdminProtectedRoute } from '../auth/ProtectedRoutes/AdminProtectedRoute'

const ProfessionnelDashboard = () => {
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
