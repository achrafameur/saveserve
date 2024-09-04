import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Card } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Typography component="h1" variant="h5">
    //       Vous êtes :
    //     </Typography>
    //     <Box sx={{ mt: 2, mb: 2 }}>
    //       <Button
    //         variant="contained"
    //         onClick={() => navigate("/signup/client")}
    //         sx={{ mr: 1 }}
    //       >
    //         Client
    //       </Button>
    //       <Button
    //         variant="contained"
    //         onClick={() => navigate("/signup/professionnel")}
    //       >
    //         Professionnel
    //       </Button>
    //     </Box>
    //     <Typography sx={{ mt: 2 }}>
    //       Déjà un compte ? <Link to="/login">Se connecter</Link>
    //     </Typography>
    //   </Box>
    // </Container>
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
            <Typography variant="h4">S'inscrire</Typography>
            <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
              Inscrivez-vous à notre plateforme
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Vous êtes :</Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/signup/client")}
              fullWidth
              sx={{ mb: 2 }}
              style={{
                background:'linear-gradient(45deg,#23a6d5, rgba(3, 162, 194, 1) 100%)',
                borderRadius:10
              }}
            >
              Client
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/signup/professionnel")}
              fullWidth
              style={{
                background:'linear-gradient(45deg,#23a6d5, rgba(3, 162, 194, 1) 100%)',
                borderRadius:10
              }}
            >
              Professionnel
            </Button>
          </Box>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Déjà un compte ?{" "}
              <Link component={RouterLink} to="/login">
                Se connecter
              </Link>
            </Typography>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
