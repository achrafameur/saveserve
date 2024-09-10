import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import InfoPopup from "../components/infoPopUp";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresseMail, setAdresseMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


  const [openInfoPopup, setInfoOpenPopup] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState(false);

  const handleOpenInfoPopUp = () => {
    setInfoOpenPopup(true);
  };

  const handleCloseInfoPopUp = () => {
    setInfoOpenPopup(false);
  };


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
     
      setPopUpMsg("Les mots de passe ne correspondent pas.");
      setInfoOpenPopup(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("adresse_mail", adresseMail);
      formData.append("password", password);
      formData.append("avatar", avatar);

      const response = await axios.post(
        "http://localhost:7000/superadmin/add-admin/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setOpenDialog(true); // Ouvre la boîte de dialogue
    } catch (error) {
      console.error(error);
      // Gestion des erreurs
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate("/admin/super_admins"); // Redirige vers la liste des super admins
  };

  return (
    <Container
      component="main"
      style={{
        width: 800,
      }}
    >
       <InfoPopup
        open={openInfoPopup}
        handleClose={handleCloseInfoPopUp}
        message={popUpMsg}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 10,
          boxShadow:
            "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
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
          Ajouter un Admin
        </div>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nom"
            name="nom"
            onChange={(e) => setNom(e.target.value)}
            style={{
              width: "90%",
              margin: "12px auto",
              display: "block",
              borderRadius: '10px',
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
            label="Prénom"
            name="prenom"
            onChange={(e) => setPrenom(e.target.value)}
            style={{
              width: "90%",
              margin: "12px auto",
              display: "block",
              borderRadius: '10px',
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
            label="Adresse Email"
            name="adresse_mail"
            type="email"
            onChange={(e) => setAdresseMail(e.target.value)}
            style={{
              width: "90%",
              margin: "12px auto",
              display: "block",
              borderRadius: '10px',
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
            label="Mot de passe"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "90%",
              margin: "12px auto",
              display: "block",
              borderRadius: '10px',
            }}
            InputProps={{
              style: {
                borderRadius: "10px",
                borderColor: "rgba(42,161,92,1)",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmer le mot de passe"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "90%",
              margin: "12px auto",
              display: "block",
              borderRadius: '10px',
            }}
            InputProps={{
              style: {
                borderRadius: "10px",
                borderColor: "rgba(42,161,92,1)",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="avatar"
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            style={{
              width: "90%",
              margin: "12px auto",
              display: "block",
              borderRadius: '10px',
            }}
            InputProps={{
              style: {
                borderRadius: "10px",
                borderColor: "rgba(42,161,92,1)",
              },
            }}
          />
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              style={{
                width: "30%",
                background: "linear-gradient(45deg, rgba(42,161,92,1) 12%, rgba(3,162,194,1) 100%)",
                borderRadius: 8,
                marginBottom : 10
              }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Ajout Réussi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            L'admin a été ajouté avec succès !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Vers la liste des admins
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddAdmin;
