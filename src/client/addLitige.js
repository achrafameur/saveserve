import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const AddLitige = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const userId = localStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        titre,
        description,
        date_ajout: new Date().toISOString(),
        admin: userId,
      };

      const response = await axios.post(
        "http://localhost:7000/client/litiges/add/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setOpenDialog(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTitre("");
    setDescription("");
  };

  return (
    <Container
      component="main"
      style={{
        width: 800,
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 10,
          boxShadow:
            "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
          fontFamily: "Century Gothic",
        }}
      >
        <div
          variant="h5"
          component="div"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            fontSize: 30,
            fontWeight: 600,
            color: "#2894a3",
          }}
          className="pageTitleHeader"
        >
          Ouvrir un litige{" "}
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Titre"
            name="titre"
            onChange={(e) => setTitre(e.target.value)}
            style={{
              width: "90%",
              margin: "12px auto",
              display: "block",
              borderRadius: "10px",
            }}
            InputProps={{
              style: {
                borderRadius: "10px",
                borderColor: "rgba(42,161,92,1)",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "90%",
              margin: "12px auto",
              display: "block",
              borderRadius: "10px",
            }}
            InputProps={{
              style: {
                borderRadius: "10px",
                borderColor: "rgba(42,161,92,1)",
              },
            }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{
                width: "30%",
                background:
                  "linear-gradient(45deg, rgba(42,161,92,1) 12%, rgba(3,162,194,1) 100%)",
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              Envoyer
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Litige Créé</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Le litige a été créé avec succès !
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddLitige;
