// Login.js
import React, { useState, useContext } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormHelperText,
  Card,
  Divider,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ adresse_mail: "", password: "" });
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/connexion/`,
        formData
      );
      const { token, id_service, id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);

      let role;
      switch (id_service) {
        case 0:
          role = "super_admin";
          break;
        case 1:
          role = "client";
          break;
        case 2:
          role = "professionnel";
          break;
        default:
          role = "guest";
          break;
      }
      localStorage.setItem("role", role);

      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      switch (id_service) {
        case 0:
          navigate("/super_admin");
          break;
        case 1:
          navigate("/client");
          break;
        case 2:
          navigate("/professionnel");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Erreur lors de la connexion.");
    }
  };

  return (
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
          <Typography variant="h4">Se connecter</Typography>
          <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
            Connectez-vous à notre plateforme
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Adresse e-mail"
            name="adresse_mail"
            onChange={handleChange}
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mot de passe"
            name="password"
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
          />
          {submitError && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{submitError}</FormHelperText>
            </Box>
          )}
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
            Se connecter
          </Button>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              Vous n'avez pas de compte ?{" "}
              <Link component={RouterLink} to="/signup">
                Inscrivez-vous
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
    </div>
  );
};

export default Login;
