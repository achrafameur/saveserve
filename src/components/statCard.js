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
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
const StatCard = (props) => {







    return (
        <>


            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px", marginTop: 0 }}>

                <Card sx={{ flexBasis: "100%", minWidth: 470 }}
                    style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px' }}>

                    <CardContent>

                        <div
                            style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>

                            <div>
                                <Typography variant="h5" component="div">
                                    {props.name}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <div style={{ display: 'flex' ,gap:5}}>
                                        {props.value}
                                        {(props.money &&
                                            <div>€</div>
                                        )}
                                    </div>

                                </Typography>
                            </div>
                            <Typography variant="body2" color="text.secondary">
                                {props.icon && <props.icon
                                    sx={{
                                        fontSize: 100,
                                        color: 'rgb(3 194 190)'

                                    }} />}
                            </Typography>
                        </div>

                    </CardContent>
                </Card>

            </Box>

        </>
    );
};

export default StatCard;
