import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Modal,
  Button,
  Box,
  TextField,
  Container,
  Grid,
  InputAdornment,
  Card,
  Link,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Footer from "../shared/Foorter";
import Navbar from "../shared/dashboard-navbar";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import InfoPopup from "../components/infoPopUp";
const ImageRequests = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [menus, setMenus] = useState([]);
  const [reload, setReload] = useState(false);

  const [adminData, setAdminData] = useState({
    nom: "",
    prenom: "",
    adresse_mail: "",
  });

  const [openInfoPopup, setInfoOpenPopup] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState(false);

  const handleOpenInfoPopUp = () => {
    setInfoOpenPopup(true);
  };

  const handleCloseInfoPopUp = () => {
    setInfoOpenPopup(false);
  };

  useEffect(() => {
    const fetchSuperAdmins = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/superadmin/pending-menus/`
      );
      setMenus(response.data);
    };
    fetchSuperAdmins();
  }, [reload]);

  const approveDeclineImage = async (menuId, adminResp) => {
    const userId = localStorage.getItem("id");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/superadmin/approve-decline-menu/`,

        {
          menu_id: menuId,
          action: adminResp,
          admin_id: userId,
        }
      );
      console.log(response.data);
      
      setPopUpMsg(`Demande ${adminResp}é avec succés! `);
      setInfoOpenPopup(true);
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
      <InfoPopup
        open={openInfoPopup}
        handleClose={handleCloseInfoPopUp}
        message={popUpMsg}
      />
        <div className="pageTitleHeader">Demandes d'ajout d'images</div>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
          {menus.length > 0 ? (
            menus.map((menu, index) => (
              <Card
                key={menu.id}
                sx={{ flexBasis: "30%", minWidth: 300 }}
                style={{
                  borderRadius: 15,
                  boxShadow:
                    "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
                }}
              >
                <Link to={`/menu/${menu.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      menu.image !== "image/upload/null"
                        ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                        : "https://res.cloudinary.com/dubrka8it/image/upload/v1724978765/food_kyvzbf.png"
                    }
                    alt={menu.nom}
                  />
                </Link>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => approveDeclineImage(menu.id, "approve")}
                    >
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#25ba74",
                          fontSize: 45,
                        }}
                      />
                    </Button>
                    <Button
                      onClick={() => approveDeclineImage(menu.id, "decline")}
                    >
                      <CancelRoundedIcon
                        style={{
                          color: "red",
                          fontSize: 45,
                        }}
                      />
                    </Button>
                  </div>
                  <Typography variant="h5" component="div">
                    {menu.nom_organisme}
                  </Typography>
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
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6" align="center" color="text.secondary">
              Il n'y a pas de demandes d'ajout pour le moment.
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ImageRequests;
