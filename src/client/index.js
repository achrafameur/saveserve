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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ClientDashboard = () => {
  const [menus, setMenus] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/menus/`
        );
        setMenus(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenus();
  }, [userId]);

  return (
    <>
      
      <Container>
        <Typography variant="h4" gutterBottom>
          Consulter les menus disponibles
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
                    <Button>
                      <FavoriteBorderIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
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

