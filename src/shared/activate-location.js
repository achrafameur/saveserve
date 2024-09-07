import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CircularProgress from "@mui/material/CircularProgress";

const ActivateLocation = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationChecked, setLocationChecked] = useState(false);

  const checkLocationStatus = () => {
    const userId = localStorage.getItem("id");

    // Vérifier si la localisation est déjà activée
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/check-location/`, {
        admin_id: userId,
      })
      .then((response) => {
        const { location_enabled } = response.data;
        setLocationEnabled(location_enabled);
        setLocationChecked(true);
      })
      .catch((error) => {
        console.error("Error checking location:", error);
      });
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userId = localStorage.getItem("id");

          // Envoyer les coordonnées au backend
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/update-location/`, {
              admin_id: userId,
              latitude: latitude,
              longitude: longitude,
            })
            .then((response) => {
              console.log("Location saved:", response.data);
              setLocationEnabled(true);
            })
            .catch((error) => {
              console.error("Error saving location:", error);
            });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Vérifie le statut de la localisation au montage du composant
    checkLocationStatus();
  }, []);

  if (!locationChecked) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <MyLocationIcon style={{ fontSize: 100, color: "#4285F4" }} />
      <Typography variant="h6" style={{ marginBottom: 20 }}>
        {locationEnabled
          ? "Votre localisation est déjà activée"
          : "Activer votre localisation pour trouver les restaurants proches"}
      </Typography>
      {!locationEnabled && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleGeolocation}
          style={{
            background:
              "linear-gradient(45deg, rgba(42,161,92,1) 12%, rgba(3,162,194,1) 100%)",
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          Activer la localisation
        </Button>
      )}
      {locationEnabled && (
        <Typography variant="body1" style={{ marginTop: 20, color: "green" }}>
          Localisation activée avec succès !
        </Typography>
      )}
    </Box>
  );
};

export default ActivateLocation;
