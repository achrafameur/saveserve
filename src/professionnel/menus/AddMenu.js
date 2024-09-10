import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

const AddMenu = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [menuType, setMenuType] = useState("Menu");
  const [isVerified, setIsVerified] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/profile/`,
          { admin_id: userId }
        );
        setIsVerified(response.data.is_verified);
        setIsDeclined(response.data.is_declined);
        setLoading(false);

      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId]);

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
    const value = parseFloat(e.target.value);
    setPrix(value);
  };

  const handleMenuTypeChange = (e) => {
    const selectedType = e.target.value;
    setMenuType(selectedType);
    if (selectedType === "Panier Mystère") {
      setNom("Panier Mystère");
    } else {
      setNom("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("nom", nom);
      formData.append("description", description);
      formData.append("prix", prix);
      formData.append("type", menuType);
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

  if (loading) {
    return null;
  }

  if (!isVerified && !isDeclined) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 15px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
            maxWidth: "700px",
            width: "100%",
            position: "relative",
            marginLeft: "20%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "4rem",
              color: "orange",
            }}
          >
            ⏳
          </Box>
          <Typography
            variant="h4"
            color="text.primary"
            fontWeight="bold"
            mt={4}
          >
            Veuillez patienter
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            Votre compte est en cours de vérification par les administrateurs.
            Veuillez patienter, cela ne devrait pas tarder.
          </Typography>
        </Box>
      </Box>
    );
  }

  if (isDeclined) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 15px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
            maxWidth: "700px",
            width: "100%",
            position: "relative",
            marginLeft: "20%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "4rem",
              color: "red",
            }}
          >
            < ReportProblemRoundedIcon style={{ fontSize: 80 }} />
          </Box>
          <Typography
            variant="h4"
            color="text.primary"
            fontWeight="bold"
            mt={4}
          >
            Adhésion Refusée
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            Votre compte a été refusé par les modérateurs de l'application.
            Pour envoyer une demande d'opposition à cette décision, veuillez nous contacter via notre email de contact : contact.saveserve@gmail.com
            Une réponse va vous être délivrée sous 5 jours.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
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
          }}
        >
          <div
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
            Ajouter un Menu
          </div>

          <Box sx={{ width: "90%", mt: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="menu-type-label">Type de Menu</InputLabel>
              <Select
                labelId="menu-type-label"
                value={menuType}
                onChange={handleMenuTypeChange}
                label="Type de Menu"
               
                sx={{
                  '& .MuiSelect-select': {
                    paddingTop: '1.5rem',  
                    paddingBottom: '1rem'  
                  },
                  '& .MuiInputLabel-outlined': {
                    top: '1.5rem'  
                  }
                }}
              >
                <MenuItem value="Menu">Menu</MenuItem>
                <MenuItem value="Panier Mystère">Panier Mystère</MenuItem>
              </Select>
            </FormControl>
          </Box>


          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
            style={{ padding: 0 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nom"
                name="nom"
                value={nom}
                onChange={handleNomChange}
                disabled={menuType === "Panier Mystère"}
                style={{
                  width: "90%",
                }}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    borderColor: "rgba(42,161,92,1)",
                  },
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Description"
                name="description"
                onChange={handleDescriptionChange}
                style={{
                  width: "90%",
                }}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    borderColor: "rgba(42,161,92,1)",
                  },
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                name="image"
                type="file"
                onChange={handleImageChange}
                style={{
                  width: "90%",
                }}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    borderColor: "rgba(42,161,92,1)",
                  },
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Prix"
                name="prix"
                type="number"
                step="0.01"
                onChange={handlePrixChange}
                style={{
                  width: "90%",
                }}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    borderColor: "rgba(42,161,92,1)",
                  },
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: 80,
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  width: "30%",
                  background:
                    "linear-gradient(45deg, rgba(42,161,92,1) 12%, rgba(3,162,194,1) 100%)",
                  borderRadius: 8,
                }}
              >
                Ajouter
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddMenu;