// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ adresse_mail: '', password: '' });
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/connexion/', formData);
      const { token, id_service, id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);

      let role;
      switch(id_service) {
        case 0:
          role = 'super_admin';
          break;
        case 1:
          role = 'client';
          break;
        case 2:
          role = 'professionnel';
          break;
        default:
          role = 'guest';
          break;
      }
      localStorage.setItem('role', role);


      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      switch(id_service) {
        case 0:
          navigate('/super_admin');
          break;
        case 1:
          navigate('/client');
          break;
        case 2:
          navigate('/professionnel');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la connexion.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Se connecter</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Adresse e-mail" name="adresse_mail" onChange={handleChange} type="email" />
          <TextField margin="normal" required fullWidth label="Mot de passe" name="password" onChange={handleChange} type="password" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Se connecter</Button>
          <Typography variant="body2" align="center">
            Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
