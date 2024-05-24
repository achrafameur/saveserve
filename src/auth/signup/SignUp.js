import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Vous êtes :
        </Typography>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate("/signup/client")}
            sx={{ mr: 1 }}
          >
            Client
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/signup/professionnel")}
          >
            Professionnel
          </Button>
        </Box>
        <Typography sx={{ mt: 2 }}>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
