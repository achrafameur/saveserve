import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import altImage from "../../src/imgs/food.png";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

const FavoriteDashboard = () => {
  const [menus, setMenus] = useState([]);
  const [resto, setResto] = useState([]);
  const [reload, setReload] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/client/favoris/menus/list/`,
          {
            params: { user_id: userId },
          }
        );
        setMenus(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenus();
  }, [userId, reload]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/client/favoris/restaurants/list/`,
          {
            user_id: userId,
          },
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
          }
        );
        setResto(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenus();
  }, [userId, reload]);

  const addToFavMenu = async (menuId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/client/favoris/menus/`,
        {
          user_id: userId,
          menu_id: menuId,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  const removeFromFavMenu = async (menuId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/client/favoris/menus/${menuId}/`,
        {
          data: {
            user_id: userId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      alert("Menu removed from favorite menus successfully");
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromFavResto = async (restoId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/client/favoris/restaurants/${restoId}/`,
        {
          data: {
            user_id: userId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      alert("resto removed from favorite menus successfully");
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <div className="pageTitleHeader">Favoris menu</div>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
          {menus.map((menu, index) => (
            <Card
              key={menu.id}
              sx={{ flexBasis: "30%", minWidth: 300 }}
              style={{
                borderRadius: 15,
                boxShadow:
                  "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
              }}
            >
              <Link to={`/menu/${menu.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    menu.image !== "image/upload/null"
                      ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                      : altImage
                  }
                  alt={menu.nom}
                />
              </Link>
              <CardContent>
                <Typography variant="h5" component="div">
                  {menu.nom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {menu.description}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Typography variant="body1">{menu.prix} €</Typography>
                  <Box display="flex" alignItems="center">
                    <Button onClick={() => removeFromFavMenu(menu.id)}>
                      <FavoriteIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      style={{
                        background:
                          "linear-gradient(45deg, rgba(57,197,116,1) 14%, rgba(3,162,194,1) 100%)",
                      }}
                    >
                      <AddShoppingCartIcon />
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <div className="pageTitleHeader">Favoris resto</div>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
          {resto.map((restaurant, index) => (
            <Card
              key={restaurant.id}
              sx={{ flexBasis: "30%", minWidth: 300 }}
              style={{
                borderRadius: 15,
                boxShadow:
                  "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
              }}
            >
              <Link to={`/restaurant/${restaurant.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    restaurant.avatar
                      ? `${process.env.REACT_APP_CLOUDINARY_URL}/${restaurant.avatar}`
                      : altImage
                  }
                  alt={restaurant.nom_organisme || "Restaurant Image"}
                />
              </Link>
              <CardContent>
                <Typography variant="h5" component="div">
                  {restaurant.nom_organisme ? restaurant.nom_organisme : "N/A"}

                  <Button onClick={() => removeFromFavResto(restaurant.id)}>
                    <BookmarkRoundedIcon />
                  </Button>
                </Typography>
                <Typography variant="h5" component="div">
                  {restaurant.localisation || "Localisation non disponible"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.adresse_mail || "Email non disponible"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default FavoriteDashboard;
