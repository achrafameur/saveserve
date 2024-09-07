import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/professionnel/restaurant/${restaurantId}/`);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  if (!restaurant) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
  }

  return (
    <Box padding={2}>
      <Typography variant="h4">Restaurant : {restaurant.nom_organisme}</Typography>
      <Typography variant="h6">Adresse : {restaurant.localisation}</Typography>
      {/* <Typography variant="body1">Latitude : {restaurant.latitude}</Typography>
      <Typography variant="body1">Longitude : {restaurant.longitude}</Typography> */}

      <Typography variant="h5" marginTop={2}>Menus :</Typography>
      <Grid container spacing={2}>
        {restaurant.menus.map((menu) => (
          <Grid item xs={12} sm={6} md={4} key={menu.id}>
            <Card>
              {menu.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={menu.image}
                  alt={menu.nom}
                />
              )}
              <CardContent>
                <Typography variant="h6">{menu.nom}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {menu.description}
                </Typography>
                <Typography variant="body1">Prix : {menu.prix} €</Typography>
                <Typography variant="body2">Disponibilité : {menu.number_dispo} unités</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RestaurantDetail;
