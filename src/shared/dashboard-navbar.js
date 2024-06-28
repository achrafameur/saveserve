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
  Divider,
  ListItemIcon,
  Box,
  Avatar,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

const DashboardNavbar = ({ onToggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/profile/`,
          { admin_id: userId }
        );
        setUserProfile(response.data);
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

  const getAvatarInitials = () => {
    if (userProfile.id_service === 2) {
      return getInitials(userProfile.nom_organisme);
    } else {
      return getInitials(userProfile.nom + " " + userProfile.prenom);
    }
  };

  const getAvatarNaming = () => {
    if (userProfile.id_service === 2) {
      return userProfile.nom_organisme;
    } else {
      return userProfile.nom + " " + userProfile.prenom;
    }
  };

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
            <img src="/logo.jpg" alt="Logo" style={{ height: 25, width: 25 }} />
          </Typography>
        </Box>
        {isAuthenticated && (
          <>
            {userAccess === 1 && (
              <IconButton color="black">
                <ShoppingCartIcon color="black" />
              </IconButton>
            )}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {getAvatarInitials()}{" "}
              </Avatar>
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
              sx={{ mt: 4 }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                  {getAvatarNaming()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userProfile.id_service === 0
                    ? "Super Admin"
                    : userProfile.id_service === 1
                    ? "Client"
                    : "Organisme"}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: "red" }} />
                </ListItemIcon>
                Déconnexion
              </MenuItem>
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
