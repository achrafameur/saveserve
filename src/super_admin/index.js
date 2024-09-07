import React from 'react';
import Navbar from '../shared/dashboard-navbar';
import Footer from '../shared/Foorter';

const SuperAdminDashboard = () => {
  return (
    <div>
      
      
      <div className="pageTitleHeader">Bienvenue, Super Admin</div>
      <div className="pageTitleHeader"
      style={{fontSize:20,fontWeight:300,height:25}}>Ceci est votre tableau de bord super admin.</div>
    </div>
  );
};

export default SuperAdminDashboard;
