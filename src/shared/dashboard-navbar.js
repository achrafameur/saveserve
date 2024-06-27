/* eslint-disable react-hooks/rules-of-hooks */
// DashboardNavbar.js
import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";

const DashboardNavbar = ({ onToggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = useState(null);
  const [userAccess, setUserAccess] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAdminMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("id");
    setIsAuthenticated(false);
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  if (!isAuthenticated) return null;

  const handleAdminMenu = (event) => {
    setAdminMenuAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/profile/`,
          { admin_id: userId }
        );
        const userProfile = response.data;
        const userRole = userProfile.id_service;

        switch (userRole) {
          case 0:
            setUserAccess(0);
            break;
          case 1:
            setUserAccess(1);
            break;
          case 2:
            setUserAccess(2);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <AppBar position="fixed" sx={{ height: "9%", backgroundColor: "white" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: 30, marginRight: 10 }}
            />
            Save&Serve
          </Typography>
        </Box>
        {isAuthenticated && (
          <>
            {userAccess === 1 && (
              <IconButton color='black'>
                <ShoppingCartIcon color='black'/>
              </IconButton>
            )}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color='black'
            >
              <AccountCircle color='black'/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profil</MenuItem>
              <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onToggleSidebar: PropTypes.func,
};

export default DashboardNavbar;
