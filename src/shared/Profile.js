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
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
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
        `${process.env.REACT_APP_BACKEND_URL}/superadmin/admin/update/${userId}/`,
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
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}
      >
        {/* <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography variant="h4">Profile</Typography>
          </Grid>
        </Grid> */}
        <Card sx={{ mt: 3 }}
          style={{ borderRadius: 15, boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px' }}>
          <CardContent>
            <div
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h4"
              style={{
                color:'#2894a3',
                fontWeight:600
              }}>Profile</Typography>
            </div>
            <Grid>

              <Grid item md={8} xs={12}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: 'center',
                    height: 200
                  }}
                >
                  <div>
                    
                    <Avatar
                      src={
                        avatar instanceof File
                          ? URL.createObjectURL(avatar)
                          : avatar
                      }
                      sx={{
                        height: 120,
                        
                        width: 120,
                        border:'2px solid #7FFFD4'
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
                            backgroundColor:'white'
                          }}
                        />
                      )}
                    </Avatar>
                    <div
                    style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      type="file"
                      onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload">
                      <Button component="span">
                        < CreateRoundedIcon />
                      </Button>
                    </label>
                    </div>
                  </div>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                    height: 100
                  }}
                >
                  <TextField
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    label="Nom"
                    size="medium"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                  <TextField
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    label="Prénom"
                    size="medium"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />

                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                    height: 100
                  }}
                >
                  <TextField
                    value={email}
                    disabled
                    label="Adresse Email"
                    required
                    size="medium"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />

                </Box>
              </Grid>
              <div
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, height: 80 }}>
                <Button>Modifier</Button>
                <Button onClick={handleSave}
                  style={{
                    background: 'linear-gradient(45deg, rgba(42,161,92,1) 12%, rgba(3,162,194,1) 100%)',
                    color: 'white',
                    borderRadius: 10
                  }}
                >Enregistrer</Button>
              </div>
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
