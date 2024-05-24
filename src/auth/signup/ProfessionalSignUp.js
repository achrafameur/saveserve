import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfessionalSignUp = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse_mail: '',
    num_siret: '',
    nom_organisme: '',
    password: '',
    id_service: 2
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/inscription/`, formData);
      alert('Inscription réussie !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'inscription.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Inscription Professionnel
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Nom"
            name="nom"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Prénom"
            name="prenom"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Adresse e-mail"
            name="adresse_mail"
            onChange={handleChange}
            type="email"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Numéro SIRET"
            name="num_siret"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Nom de l'organisme"
            name="nom_organisme"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mot de passe"
            name="password"
            onChange={handleChange}
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
          <Button
            component={Link}
            to="/signup"
            fullWidth
            sx={{ mt: 1 }}
          >
            Retour
          </Button>
          <Typography sx={{ mt: 2 }}>
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfessionalSignUp;
