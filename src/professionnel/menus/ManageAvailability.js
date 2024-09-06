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
import altImage from '../../../src/imgs/food.png'

const ManageAvailability = () => {
  const [menus, setMenus] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/superadmin/admin/${userId}/menus/`
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
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/update/${id}/`, {
        number_dispo:
          (menus.find((menu) => menu.id === id).number_dispo || 0) + 1,
      });
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
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/update/${id}/`, {
          number_dispo: currentNumberDispo - 1,
        });
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

  const getStatusBanner = (menu) => {
    if (menu.is_declined) {
      return { text: 'Refusé', color: 'red' };
    } else if (menu.is_approved) {
      return { text: 'Accepté', color: 'green' };
    } else {
      return { text: 'En attente', color: 'orange' };
    }
  };

  return (
    <>
      <Container>
        <div className="pageTitleHeader">
          Gérer les disponibilités
        </div>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
          {menus.map((menu, index) => (
            <Card key={menu.id} sx={{ flexBasis: "30%", minWidth: 300 }} 
              style={{ borderRadius: 10, position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px' }}>
              
              <Link to={`/menu/${menu.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    menu.image !== 'image/upload/null'
                      ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                      : altImage
                  }
                  alt={menu.nom}
                />
              </Link>

              <CardContent>
                {/* Titre et bannière de statut */}
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" component="div">
                    {menu.nom}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: getStatusBanner(menu).color,
                      color: "white",
                      padding: "2px 5px",
                      borderRadius: 5,
                      fontWeight: "bold"
                    }}
                  >
                    {getStatusBanner(menu).text}
                  </Box>
                </Box>

                {/* Description du menu */}
                <Typography variant="body2" color="text.secondary" mt={1}>
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
                      style={{
                        background: 'linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)'
                      }}
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
                      style={{
                        background: 'linear-gradient(45deg, rgb(152 17 45) 12%, rgb(254 75 75) 100%)'
                      }}
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
