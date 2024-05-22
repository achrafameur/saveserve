import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import Navbar from './Navbar';

const Profile = () => {
  const profileData = {
    nom: 'Doe',
    prenom: 'John',
    email: 'john.doe@example.com',
    role: 'Client',
  };

  return (
    <Container sx={{ marginTop: 4 }} maxWidth="lg">
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Votre Profil
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Informations Personnelles
            </Typography>
            <Typography>
              <strong>Nom:</strong> {profileData.nom}
            </Typography>
            <Typography>
              <strong>Prénom:</strong> {profileData.prenom}
            </Typography>
            <Typography>
              <strong>Email:</strong> {profileData.email}
            </Typography>
            <Typography>
              <strong>Rôle:</strong> {profileData.role}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Ajoutez d'autres informations de profil ici si nécessaire */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
