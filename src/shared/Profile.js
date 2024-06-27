// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";
import Navbar from "./dashboard-navbar";
import Footer from "./Foorter";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/profile/`,
          { admin_id: userId }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <>
      
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Profile
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Nom: {profileData.nom}</Typography>
            <Typography variant="h6">Prénom: {profileData.prenom}</Typography>
            <Typography variant="h6">
              Email: {profileData.adresse_mail}
            </Typography>
          </Box>
        </Box>
      </Container>
      
    </>
  );
};

export default Profile;
