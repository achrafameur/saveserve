import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";

const MenuView = () => {
  const { menu_id } = useParams();
  const [menu, setMenu] = useState(null);

  // Récupérer les détails du produit depuis l'API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/${menu_id}/`
        );
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      }
    };

    fetchProductDetails();
  }, [menu_id]);

  return (
    <Box>
      <Box
        sx={{
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 30,
          fontWeight: 600,
          color: "rgb(40, 148, 163)"
        }}
      >
        Fiche du Menu
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            boxShadow: "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
            width: { xs: "100%", sm: "80%", md: "70%" },
            padding: 2,
            borderRadius: 2
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" mt={2}>
                {menu && (
                  <img
                    src={menu.image !== "image/upload/null"
                      ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                      : `https://res.cloudinary.com/dubrka8it/image/upload/v1724978765/food_kyvzbf.png`}
                    alt={menu.nom}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      borderRadius: 10
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" justifyContent="center" mt={2}>
                {menu && (
                  <>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Nom :
                    </Typography>
                    <Typography variant="body1" sx={{ paddingLeft: 2 }}>
                      {menu.nom}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" gutterBottom mt={2}>
                      Description :
                    </Typography>
                    <Typography variant="body1" sx={{ paddingLeft: 2 }}>
                      {menu.description}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" gutterBottom mt={2}>
                      Prix :
                    </Typography>
                    <Typography variant="body1" sx={{ paddingLeft: 2 }}>
                      {menu.prix} €
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuView;
