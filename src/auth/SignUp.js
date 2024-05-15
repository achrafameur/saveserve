import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Container, Typography, Box } from '@mui/material';

const SignUp = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    nom_organisme: '',
    adresse_mail: '',
    password: '',
    id_service: 1
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
      const response = await axios.post('http://localhost:7000/api/inscription/', formData);
      console.log(response.data);
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
          S'inscrire
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
            fullWidth
            label="Nom de l'organisme"
            name="nom_organisme"
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
            required
            fullWidth
            label="Mot de passe"
            name="password"
            onChange={handleChange}
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Type d'admin"
            name="id_service"
            onChange={handleChange}
            select
            value={formData.id_service}
          >
            <MenuItem value={0}>Super Admin</MenuItem>
            <MenuItem value={1}>Client</MenuItem>
            <MenuItem value={2}>Professionnel</MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
