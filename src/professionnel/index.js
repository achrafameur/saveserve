import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Foorter';

const ProfessionnelDashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Bienvenue, Professionnel</h1>
      <p>Ceci est votre tableau de bord professionnel.</p>
      <Footer />
    </div>
  );
};

export default ProfessionnelDashboard;
