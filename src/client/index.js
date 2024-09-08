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
  TextField
} from "@mui/material";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import altImage from "../../src/imgs/food.png";

const ClientDashboard = () => {
  const [menus, setMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("id");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/professionnel/menus/`,
          {
            user_id: userId,
            search_query: searchQuery
          },
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
          }
        );
        setMenus(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenus();
  }, [reload, userId, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Mettre à jour le texte de recherche
  };

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
      alert("Menu added from favorite menus successfully");

      setReload(!reload)
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

  const addToFavResto = async (restoId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/client/favoris/restaurants/`,
        {
          user_id: userId,
          restaurant_id: restoId,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      alert("resto added to favorite resto successfully");

      setReload(!reload)
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors
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

  const addToChart = async (menuId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/client/panier/add/`,
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
      alert("menu added to chart successfully!");
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  return (
    <>
      <Container>
        <Box display="flex" justifyContent="space-between" mt={2} alignItems="center" >
          <div className="pageTitleHeader">Consulter les menus disponibles</div>
          <TextField
            id="outlined-basic"
            label="Rechercher un menu ou restaurant"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              minWidth : '300px',
            }}
          />
        </Box>
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
              <Link to={`/client/menu/${menu.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    menu.image !== "image/upload/null" && menu.is_approved
                      ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                      : `https://res.cloudinary.com/dubrka8it/image/upload/v1724978765/food_kyvzbf.png`
                  }
                  alt={menu.nom}
                />
              </Link>
              <CardContent>
                <Typography variant="h5" component="div">
                  {menu.nom_organisme ? menu.nom_organisme : "N/A"}
                  {menu.is_favoris_restaurant ? (
                    <Button onClick={() => removeFromFavResto(menu.admin.id)}>
                      <BookmarkRoundedIcon />
                    </Button>
                  ) : (
                    <Button onClick={() => addToFavResto(menu.admin.id)}>
                      <BookmarkBorderRoundedIcon />
                    </Button>
                  )}
                </Typography>

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
                    {menu.is_favoris_menu ? (
                      <Button onClick={() => removeFromFavMenu(menu.id)}>
                        <FavoriteIcon />
                      </Button>
                    ) : (
                      <Button onClick={() => addToFavMenu(menu.id)}>
                        <FavoriteBorderIcon />
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="success"
                      style={{
                        background:
                          "linear-gradient(45deg, rgba(57,197,116,1) 14%, rgba(3,162,194,1) 100%)",
                      }}
                      onClick={() => addToChart(menu.id)}
                    >
                      <AddShoppingCartIcon />
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default ClientDashboard;
