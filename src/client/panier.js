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
    Dialog,
    DialogContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import altImage from '../../src/imgs/food.png'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
const Panier = () => {

    function calculateTotalPrice(cart) {
        return cart.reduce((total, item) => {
            return total + parseFloat(item.total);
        }, 0);
    }


    const [menus, setMenus] = useState([]);
    const [reload, setReload] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPopUp, setShowPopUp] = useState(false);
    const [refrenceStripe, setRefrenceStripe] = useState('');
    const [linkStripe, setLinkStripe] = useState('');



    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/client/panier/`, {
                    params: { user_id: userId }
                }
                );
                setMenus(response.data);
                const total = calculateTotalPrice(response.data)
                setTotalPrice(total)
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
            alert('Menu removed from favorite menus successfully');
            setReload(!reload);
        } catch (error) {
            console.error(error);

        }
    };

    const removeFromChart = async (menuId) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/client/panier/delete/${menuId}/`,

            );

            console.log(response.data);
            alert('Menu removed from Chart menus successfully');
            setReload(!reload);
        } catch (error) {
            console.error(error);

        }
    };

    const handleIncrement = async (id) => {
        setQuantity(quantity + 1)
    };

    const handleDecrement = async (id) => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    };


    const showChart = async () => {
        setShowPopUp(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/client/panier/validate/`,
                {
                    user_id: userId,
                }
            );

            console.log(response.data);
            setRefrenceStripe(response.data.reference)
            const responseStripe = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/client/create-checkout-session/`,
                {
                    reference: response.data.reference,
                }
            );
            console.log(responseStripe)
            setLinkStripe(responseStripe.data.url)
            window.open(responseStripe.data.url, '_blank');

        } catch (error) {
            console.error(error);
        }
    };

    const sendToStripe = () => {

        setShowPopUp(true)

    };
    return (
        <>

            <Container>




                <Dialog open={showPopUp} onClose={() => setShowPopUp(false)} fullWidth maxWidth="lg"
                    PaperProps={{
                        style: {
                            borderRadius: 10,
                            marginLeft: 340
                        },
                    }}
                >
                    <DialogContent>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 30,
                                color: 'rgb(40, 148, 163)',
                                fontWeight: 500
                            }}
                        >Your Order</div>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
                            {menus.map((menu, index) => (
                                <Card key={menu.id} sx={{ flexBasis: "30%", minWidth: 300 }}
                                    style={{ borderRadius: 15, boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px' }}>
                                    <div
                                        style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Button
                                            id="deleteButton"
                                            onClick={() => removeFromChart(menu.id)}>
                                            X
                                        </Button></div>

                                    <Link to={`/menu/${menu.id}`}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={
                                                menu.menu.image !== 'image/upload/null'
                                                    ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                                                    : altImage
                                            }
                                            alt={menu.menu.nom}
                                        />

                                    </Link>

                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {menu.menu.nom}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {menu.menu.description}
                                        </Typography>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            mt={2}
                                        >
                                            <Typography variant="body1">{menu.menu.prix} €</Typography>
                                            <Box display="flex" alignItems="center">
                                                <Button onClick={() => removeFromFavMenu(menu.id)}>
                                                    <FavoriteBorderIcon />
                                                </Button>



                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                        <div>
                            <Button
                                style={{
                                    background: 'linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)',
                                    color: 'white',
                                }}
                                onClick={sendToStripe}>
                                Payer
                                < PointOfSaleOutlinedIcon />
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>





                <div
                    className="pageTitleHeader"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div>Mon Panier
                        {/* < ShoppingCartRoundedIcon /> */}
                    </div>
                    <div
                    style={{display:'flex',gap:10}}>Total : {totalPrice} <div
                    style={{color:'rgba(42, 161, 92, 1) 12%'}}>€</div></div>
                </div>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px", marginBottom: 5, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: 10, padding: 5 }}>
                    {menus.map((menu, index) => (
                        <Card key={menu.id} sx={{ flexBasis: "30%", minWidth: 340 }}
                            style={{ borderRadius: 15, boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px' }}>
                            <div
                                style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button
                                    id="deleteButton"
                                    onClick={() => removeFromChart(menu.id)}>
                                    X
                                </Button></div>

                            <Link to={`/menu/${menu.id}`}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={
                                        menu.menu.image !== 'image/upload/null'
                                            ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                                            : `https://res.cloudinary.com/dubrka8it/image/upload/v1724978765/food_kyvzbf.png`
                                    }
                                    alt={menu.menu.nom}
                                />

                            </Link>

                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {menu.menu.nom}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {menu.menu.description}
                                </Typography>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mt={2}
                                >
                                    <Typography variant="body1">{menu.menu.prix} €</Typography>
                                    <Box display="flex" alignItems="center">
                                        <Button onClick={() => removeFromFavMenu(menu.id)}>
                                            <FavoriteBorderIcon />
                                        </Button>


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
                                                {quantity || 0}
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
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <div>
                    <Button
                        style={{
                            background: 'linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)',
                            color: 'white',
                        }}
                        onClick={showChart}>
                        Payer
                        < PointOfSaleOutlinedIcon />
                    </Button>
                </div>
            </Container>

        </>
    );
};

export default Panier;

