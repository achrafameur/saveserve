import React, { useState } from "react";
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
  DialogActions
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ClientSignUp = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse_mail: "",
    password: "",
    id_service: 1,
  });

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
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Typography component="h1" variant="h5">
    //       Inscription Client
    //     </Typography>
    //     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
    //       <TextField
    //         margin="normal"
    //         fullWidth
    //         label="Nom"
    //         name="nom"
    //         onChange={handleChange}
    //       />
    //       <TextField
    //         margin="normal"
    //         fullWidth
    //         label="Prénom"
    //         name="prenom"
    //         onChange={handleChange}
    //       />
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         label="Adresse e-mail"
    //         name="adresse_mail"
    //         onChange={handleChange}
    //         type="email"
    //       />
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         label="Mot de passe"
    //         name="password"
    //         onChange={handleChange}
    //         type="password"
    //       />
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         S'inscrire
    //       </Button>
    //       <Button
    //         component={Link}
    //         to="/signup"
    //         fullWidth
    //         sx={{ mt: 1 }}
    //       >
    //         Retour
    //       </Button>
    //       <Typography sx={{ mt: 2 }}>
    //         Déjà un compte ? <Link to="/login">Se connecter</Link>
    //       </Typography>
    //     </Box>
    //   </Box>
    // </Container>
    <div
    style={{backgroundColor:'black',height:'110vh',marginTop:-100,display:'flex',alignItems:'center'}}
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
            Inscrivez-vous en tant que client
          </Typography>
        </Box>
        {/* <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Inscription Client
          </Typography>
        </Box> */}
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

export default ClientSignUp;
