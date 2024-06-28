// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [isEditingName, setIsEditingName] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/profile/`,
          { admin_id: userId }
        );
        setProfileData(response.data);
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setEmail(response.data.adresse_mail);
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("adresse_mail", email); // Assurez-vous que ce champ est géré par le backend
      if (avatar instanceof File) {
        formData.append("avatar", avatar);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/update/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileData({
        ...profileData,
        nom,
        prenom,
        avatar: avatar instanceof File ? URL.createObjectURL(avatar) : avatar,
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_BACKEND_URL}/admin/delete/${userId}/`
  //     );
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("isAuthenticated");
  //     localStorage.removeItem("id");
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography variant="h4">Profile</Typography>
          </Grid>
        </Grid>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Détails de base</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Avatar
                    src={
                      avatar instanceof File
                        ? URL.createObjectURL(avatar)
                        : avatar
                    }
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  >
                    {avatar === "" ? (
                      <PersonOutlineIcon fontSize="small" />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_CLOUDINARY_URL}/${avatar}`}
                        alt={avatar}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "400px",
                        }}
                      />
                    )}
                  </Avatar>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="avatar-upload"
                    type="file"
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor="avatar-upload">
                    <Button component="span">Changer</Button>
                  </label>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    label="Nom"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                  <TextField
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    label="Prénom"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                  <Button onClick={handleSave}>Enregistrer</Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    value={email}
                    disabled
                    label="Adresse Email"
                    required
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                  <Button>Modifier</Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* <Card sx={{ mt: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Profil public</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                Dataaaa heeereeee
              </Grid>
            </Grid>
          </CardContent>
        </Card> */}
        {/* <Card sx={{ mt: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Supprimer le compte</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Typography sx={{ mb: 3 }} variant="subtitle1">
                  Supprimez votre compte et toutes vos données. Cette action est
                  irréversible.
                </Typography>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleClickOpen}
                >
                  Supprimer le compte
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Confirmer la suppression"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Êtes-vous sûr de vouloir supprimer votre compte ? Cette
                      action est irréversible.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Annuler
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                      Confirmer
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </CardContent>
        </Card> */}
      </Container>
    </>
  );
};

export default Profile;
