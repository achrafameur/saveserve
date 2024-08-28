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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import altImage from "../../src/imgs/food.png";

const ClientDashboard = () => {
  const [menus, setMenus] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/professionnel/menus/`,
          {
            user_id: userId,
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
  }, [userId]);

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
        <div className="pageTitleHeader">Consulter les menus disponibles</div>
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
                    <Button onClick={() => addToFavMenu(menu.id)}>
                      <FavoriteBorderIcon />
                    </Button>
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
