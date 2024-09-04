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
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';

const Commandes = () => {
  const [menus, setMenus] = useState([]);
  const [resto, setResto] = useState([]);
  const [reload, setReload] = useState(false);
  const userId = localStorage.getItem("id");


  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/client/commandes/${userId}`,
            
          );
        // setResto(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenus();
  }, [userId, reload]);


 


  return (
    <>
      <Container>

      
      </Container>
    </>
  );
};

export default Commandes;
