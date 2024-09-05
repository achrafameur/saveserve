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

const CommandesPro = () => {
    const [menus, setMenus] = useState([]);
    const [orders, setOrders] = useState([]);
    const [reload, setReload] = useState(false);
    const userId = localStorage.getItem("id");


    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/professionnel/commandes/${userId}/`,

                );
                setOrders(response.data.orders);
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
                style={{marginTop:15,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    Listes des commandes
                    <div>
                        {orders.length}
                    </div>
                </div>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px", marginTop: 0 }}>
                    {orders.map((menu, index) => (
                        <Card key={menu.id} sx={{ flexBasis: "100%", minWidth: 300 }}
                            style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px' }}>

                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {menu.commande_reference}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Date Commande : {menu.date_commande}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Commande : {menu.total_commande} €
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Client : 
                                    {menu.prenom_client} {menu.nom_client}
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
                                    {menu.menus.map((menu, index) => (
                                        <Card key={menu.id} sx={{ flexBasis: "30%", minWidth: 300 }}
                                            style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px' }}>

                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {menu.menu_nom}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Quantite : {menu.quantite}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Prix unitaire : {menu.prix_unitaire} €

                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">

                                                    Prix Total : {menu.total} €
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </>
    );
};

export default CommandesPro;
