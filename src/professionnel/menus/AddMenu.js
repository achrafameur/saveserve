import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Navbar from "../../shared/dashboard-navbar";
import Footer from "../../shared/Foorter";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const userId = localStorage.getItem("id");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePrixChange = (e) => {
    setPrix(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("nom", nom);
      formData.append("description", description);
      formData.append("prix", prix);
      formData.append("admin", userId);
      console.log(formData);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/add/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      navigate("/gerer-disponibilites");
    } catch (error) {
      console.error(error);
      // Gestion des erreurs
    }
  };

  return (
    <>
      
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
            Ajouter un menu
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nom"
              name="nom"
              onChange={handleNomChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              name="description"
              onChange={handleDescriptionChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="image"
              type="file"
              onChange={handleImageChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Prix"
              name="prix"
              type="number"
              step="0.01"
              onChange={handlePrixChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Container>
      
    </>
  );
};

export default AddMenu;
