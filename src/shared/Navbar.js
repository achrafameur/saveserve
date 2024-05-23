/* eslint-disable react-hooks/rules-of-hooks */
// Navbar.js
import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = useState(null);
  const [userAcess, setUserAcess] = useState(null);
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
          "http://localhost:7000/api/profile/",
          { admin_id: userId }
        );
        const userProfile = response.data;
        const userRole = userProfile.id_service;

        switch (userRole) {
          case 0:
            setUserAcess(0);
            break;
          case 1:
            setUserAcess(1);
            break;
          case 2:
            setUserAcess(2);
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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Save&Serve
        </Typography>
        {isAuthenticated && (
          <>
            {userAcess === 0 && (
              <>
                <Button color="inherit" onClick={handleAdminMenu}>
                  Gérer les Admins
                </Button>
                <Menu
                  id="admin-menu"
                  anchorEl={adminMenuAnchorEl}
                  keepMounted
                  open={Boolean(adminMenuAnchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={Link}
                    to="/admin/super_admins"
                    onClick={handleClose}
                  >
                    Super Admins
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/admin/clients"
                    onClick={handleClose}
                  >
                    Clients
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/admin/professionnels"
                    onClick={handleClose}
                  >
                    Professionnels
                  </MenuItem>
                </Menu>
              </>
            )}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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

export default Navbar;
