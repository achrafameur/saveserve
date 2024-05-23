import React from 'react';
import Footer from '../shared/Foorter';
import Navbar from '../shared/Navbar';

const ClientDashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Bienvenue, Client</h1>
      <p>Ceci est votre tableau de bord client.</p>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
