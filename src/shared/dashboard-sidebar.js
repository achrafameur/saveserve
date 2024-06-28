import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Example icons
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListIcon from "@mui/icons-material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";
import axios from "axios";
import { Link as RouterLink, useLocation } from "react-router-dom";

const drawerWidth = 240;

const getSections = (userAccess) => {
  const sectionsByRole = {
    0: [
      // Super Admin
      {
        title: "Génerale",
        icon: <HomeIcon />,
        items: [
          {
            title: "Tableau de bord",
            path: "/super_admin",
            icon: <HomeIcon />,
          },
        ],
      },
      {
        title: "Gestion des Admins",
        icon: <SettingsIcon />,
        items: [
          {
            title: "Super Admins",
            path: "/admin/super_admins",
            icon: <PeopleIcon />,
          },
          { title: "Clients", path: "/admin/clients", icon: <PeopleIcon /> },
          {
            title: "Professionnels",
            path: "/admin/professionnels",
            icon: <PeopleIcon />,
          },
        ],
      },
    ],
    1: [
      // Client
      {
        title: "Génerale",
        icon: <HomeIcon />,
        items: [
          { title: "Tableau de bord", path: "/client", icon: <HomeIcon /> },
        ],
      },
      {
        title: "Client",
        icon: <PeopleIcon />,
        items: [
          { title: "Mon Panier", path: "/panier", icon: <ShoppingCartIcon /> },
          { title: "Mes Commandes", path: "/commandes", icon: <ListIcon /> },
        ],
      },
    ],
    2: [
      // Professionnel
      {
        title: "Générale",
        icon: <HomeIcon />,
        items: [
          {
            title: "Tableau de bord",
            path: "/professionnel",
            icon: <HomeIcon />,
          },
        ],
      },
      {
        title: "Gestion",
        icon: <PeopleIcon />,
        items: [
          {
            title: "Ajouter un menu",
            path: "/ajouter-menu",
            icon: <MenuBookIcon />,
          },
          {
            title: "Liste des menus",
            path: "/gerer-disponibilites",
            icon: <ListIcon />,
          },
          {
            title: "Liste des commandes",
            path: "/commandes",
            icon: <ListIcon />,
          },
        ],
      },
    ],
  };

  return sectionsByRole[userAccess] || [];
};

const DashboardSidebar = ({ open, onClose }) => {
  const [userAccess, setUserAccess] = useState(null);
  const userId = localStorage.getItem("id");
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/profile/`,
          { admin_id: userId }
        );
        const userProfile = response.data;
        const userRole = userProfile.id_service;
        setUserAccess(userRole);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, [userId]);

  if (userAccess === null) {
    return null; // or a loader
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#111827",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <RouterLink to="/">
            <img src="/logo.jpg" alt="Logo" style={{ height: 25, width: 25 }} />
          </RouterLink>
          <Typography variant="h6" noWrap sx={{ marginLeft: 2 }}>
            Save&Serve
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {getSections(userAccess).map((section) => (
          <Box key={section.title}>
            <ListItem>
              <ListItemText
                primary={section.title}
                sx={{
                  marginLeft: 2,
                  color: "grey",
                  fontFamily: "Arial", // Change to your preferred font
                  fontWeight: "bold",
                }}
              />
            </ListItem>
            <List component="div" disablePadding>
              {section.items.map((item) => (
                <ListItem
                  button
                  component={RouterLink}
                  to={item.path}
                  key={item.title}
                  sx={{
                    pl: 4,
                    marginLeft: 2,
                    backgroundColor:
                      location.pathname === item.path
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                    borderLeft:
                      location.pathname === item.path
                        ? "4px solid grey"
                        : "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {item.icon}
                  <ListItemText primary={item.title} sx={{ marginLeft: 2 }} />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DashboardSidebar;
