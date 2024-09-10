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
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import "../App.css";
const Commandes = () => {
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/client/commandes/${userId}/`
        );
        const reversedOrders = response.data.commandes.reverse();
        setOrders(reversedOrders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenus();
  }, [userId, reload]);

  return (
    <>
      <Container>
        <div
          className="pageTitleHeader"
          style={{
            marginTop: 15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Listes des commandes
          <div
            style={{ fontSize: 32 }}>Nombre total des commandes : {orders.length}</div>
        </div>

        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: "25px", marginTop: 0 }}
        >
          {orders.length > 0 ? (
            orders.map((menu, index) => (
              <Card
                key={menu.id}
                sx={{ flexBasis: "100%", minWidth: 300 }}
                style={{
                  borderRadius: 10,
                  boxShadow:
                    "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                  N° de référence : {menu.reference}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date Commande : {menu.date_commande}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Commande : {menu.montant_total} €
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
                    {menu.items.map((item, index) => (
                      <Card
                        key={item.id}
                        sx={{ flexBasis: "30%", minWidth: 300 }}
                        style={{
                          borderRadius: 10,
                          boxShadow:
                            "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                        }}
                      >
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {item.nom}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantité : {item.quantite}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Prix unitaire : {item.prix} €
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Prix Total : {item.total} €
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary" align="center">
              Aucune commande passée pour le moment.
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Commandes;
