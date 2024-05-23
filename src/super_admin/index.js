import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Foorter';

const SuperAdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Bienvenue, Super Admin</h1>
      <p>Ceci est votre tableau de bord super admin.</p>
      <Footer />
    </div>
  );
};

export default SuperAdminDashboard;
