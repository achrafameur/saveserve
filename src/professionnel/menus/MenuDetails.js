// MenuDetails.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../../shared/dashboard-navbar";
import Footer from "../../shared/Foorter";

const MenuDetails = () => {
  const { menu_id } = useParams();
  const [menu, setMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editableFields, setEditableFields] = useState({});
  const navigate = useNavigate();

  // Récupérer les détails du produit depuis l'API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/${menu_id}/`
        );
        setMenu(response.data);
        setEditableFields(response.data);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      }
    };

    fetchProductDetails();
  }, [menu_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the editableFields state when input fields change
    setEditableFields({
      ...editableFields,
      [name]: value,
    });
  };

  const handleDeleteMenu = async () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/update/${menu_id}/`,
        editableFields
      );
      setMenu(editableFields);
      navigate("/gerer-disponibilites");
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/delete/${menu_id}/`
      );
      setShowModal(false);
      navigate("/gerer-disponibilites");
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <Box>
      
      <Typography variant="h4" gutterBottom>
        Fiche du Menu
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Paper
              elevation={3}
              style={{ padding: "20px", width: "100%", height: "100%" }}
            >
              {menu && (
                <>
                  <img
                    src={`${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`}
                    alt={menu.nom}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                    }}
                  />
                </>
              )}
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
              {menu && (
                <>
                  <TextField
                    label="Nom"
                    name="nom"
                    value={editableFields.nom || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={editableFields.description || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <TextField
                    label="Prix"
                    name="prix"
                    value={editableFields.prix || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                    step="0.01"
                  />
                  <Box mt={2} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Enregistrer les modifications
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDeleteMenu}
                      sx={{ ml: 2 }}
                    >
                      Supprimer le produit
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={showModal}
        onClose={handleCancelDelete}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Êtes-vous sûr de vouloir supprimer ce produit ?
          </Typography>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmDelete}
            >
              Confirmer
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelDelete}
              sx={{ ml: 2 }}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
      
    </Box>
  );
};

export default MenuDetails;
