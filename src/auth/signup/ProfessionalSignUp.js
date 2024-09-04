import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  Link,
  Dialog,
  DialogContent,
  DialogActions,
  Autocomplete
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProfessionalSignUp = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [cityOptions, setCityOptions] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse_mail: "",
    num_siret: "",
    nom_organisme: "",
    password: "",
    id_service: 2,
    localisation: ""
  });

  const fetchCities = async (query) => {
    try {
      const response = await axios.get(
        `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom&format=json&geometry=centre`
      );
      const cities = response.data.map(city => ({
        value: city.nom,
        label: city.nom
      }));
      setCityOptions(cities);
    } catch (error) {
      console.error("Erreur lors du chargement des villes :", error);
    }
  };

  const handleCitySearch = (event) => {
    const query = event.target.value;
    if (query && query.length > 2) {  // Vérification que query est défini et a une longueur supérieure à 2
      fetchCities(query);
    } else {
      setCityOptions([]); // Réinitialiser les options si l'utilisateur supprime tout ou si query est indéfini
    }
  };

  const handleCitySelectChange = (event, value) => {
    setFormData({
      ...formData,
      localisation: value ? value.value : ""
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/inscription/`,
        formData
      );
      setOpen(true);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/login');
  };

  return (
    <div
      style={{ backgroundColor: 'black', height: '110vh', marginTop: -100, display: 'flex', alignItems: 'center' }}
      className="loginStyling">
      <Container component="main" maxWidth="sm" sx={{ mt: "5%" }}>
        <Card elevation={16} sx={{ p: 4 }}
        style={{
        
          borderRadius:15
        }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <RouterLink to="/">
              <img src="/logo.jpg" alt="Logo" style={{ height: 80, width: 80 }} />
            </RouterLink>
            <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
              Inscrivez-vous en tant que professionnel
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <Autocomplete
              options={cityOptions}
              getOptionLabel={(option) => option.label}
              onInputChange={(event, value) => handleCitySearch({ target: { value } })}
              onChange={handleCitySelectChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choisir une ville"
                  fullWidth
                />
              )}
              value={formData.localisation ? { label: formData.localisation } : null}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                background:'linear-gradient(45deg,#23a6d5, rgba(3, 162, 194, 1) 100%)',
                borderRadius:10
              }}
            >
              S'inscrire
            </Button>
            <Button component={RouterLink} to="/signup" fullWidth sx={{ mt: 1 }}>
              Retour
            </Button>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Déjà un compte ?{" "}
                <Link component={RouterLink} to="/login">
                  Se connecter
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, marginRight: 2 }} />
            <Typography variant="h6">
              Inscription réussie ! Vous pouvez maintenant vous connecter avec votre nouveau compte.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">OK</Button>
          </DialogActions>
        </Dialog>

      </Container>
    </div>
  );
};

export default ProfessionalSignUp;
