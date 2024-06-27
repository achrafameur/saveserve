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
import Navbar from "../../shared/dashboard-navbar";
import Footer from "../../shared/Foorter";
import { Link } from "react-router-dom";

const ManageAvailability = () => {
  const [menus, setMenus] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/${userId}/menus/`
        );
        setMenus(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenus();
  }, [userId]);

  const handleIncrement = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/menu/update/${id}/`, {
        number_dispo:
          (menus.find((menu) => menu.id === id).number_dispo || 0) + 1,
      });
      // Mettre à jour la liste des menus avec la nouvelle valeur de number_dispo
      setMenus((prevMenus) => {
        return prevMenus.map((menu) => {
          if (menu.id === id) {
            return { ...menu, number_dispo: response.data.number_dispo };
          }
          return menu;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrement = async (id) => {
    const currentNumberDispo =
      menus.find((menu) => menu.id === id).number_dispo || 0;
    if (currentNumberDispo > 0) {
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/menu/update/${id}/`, {
          number_dispo: currentNumberDispo - 1,
        });
        // Mettre à jour la liste des menus avec la nouvelle valeur de number_dispo
        setMenus((prevMenus) => {
          return prevMenus.map((menu) => {
            if (menu.id === id) {
              return { ...menu, number_dispo: response.data.number_dispo };
            }
            return menu;
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      
      <Container>
        <Typography variant="h4" gutterBottom>
          Gérer les disponibilités
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {menus.map((menu, index) => (
            <Card key={menu.id} sx={{ flexBasis: "30%", minWidth: 300 }}>
              <Link to={`/menu/${menu.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`} // Assurez-vous que l'API renvoie l'URL de l'image du menu
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
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleIncrement(menu.id)}
                    >
                      +
                    </Button>
                    <Typography variant="body1" mx={1}>
                      {menu.number_dispo || 0}
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDecrement(menu.id)}
                    >
                      -
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

export default ManageAvailability;
