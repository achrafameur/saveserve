import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import InfoPopup from "../components/infoPopUp";

const SuperAdminsTable = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [openInfoPopup, setInfoOpenPopup] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState(false);

  const handleOpenInfoPopUp = () => {
    setInfoOpenPopup(true);
  };

  const handleCloseInfoPopUp = () => {
    setInfoOpenPopup(false);
  };


  // Récupérer les données depuis l'API
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/professionnel/admins/list-professionnels/`
        );
        setSuperAdmins(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des super administrateurs",
          error
        );
      }
    };
    fetchProfessionals();
  }, []);

  // Fonction pour valider un professionnel
  const handleVerify = async (adminId) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/verifier-professionnel/${adminId}/`
      );
      setPopUpMsg("Professionnel validé");
      setInfoOpenPopup(true);

      setSuperAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
    } catch (error) {
      console.error("Erreur lors de la validation du professionnel", error);
    }
  };

  // Fonction pour refuser un professionnel
  const handleDecline = async (adminId) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/professionnel/refuser-professionnel/${adminId}/`
      );
      
      setPopUpMsg("Professionnel refusé");
      setInfoOpenPopup(true);
      
      setSuperAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
    } catch (error) {
      console.error("Erreur lors du refus du professionnel", error);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8, px: { xs: 2, sm: 4 } }}>
       <InfoPopup
        open={openInfoPopup}
        handleClose={handleCloseInfoPopUp}
        message={popUpMsg}
      />
      {/* <TextField
        fullWidth
        inputRef={queryRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Rechercher un super admin"
        variant="outlined"
        sx={{ mb: 3 }}
      /> */}
      <Grid container justifyContent="space-between" spacing={3}>
        <Grid item>
          <div className="pageTitleHeader"
          style={{height:20}}>
            Demandes d'inscriptions de professionnels
          </div>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgb(40 157 163 / 69%)", // Couleur d'en-tête
                color: "#fff", // Couleur du texte
              }}
            >
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Nom</TableCell>
              <TableCell sx={{ color: "#fff" }}>Prénom</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Nom Organisme</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {superAdmins.length > 0 ? (
              superAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>{admin.nom}</TableCell>
                  <TableCell>{admin.prenom}</TableCell>
                  <TableCell>{admin.adresse_mail}</TableCell>
                  <TableCell>{admin.nom_organisme}</TableCell>
                  <TableCell>
                    {/* Boutons pour valider et refuser */}
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleVerify(admin.id)}
                      sx={{
                        mr: 1,
                        mb: 1,
                        whiteSpace: "nowrap",
                        fontSize: { xs: "0.75rem", sm: "1rem" }, // Responsive font size
                        px: { xs: 1, sm: 2 },
                      }}
                    >
                      Valider
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDecline(admin.id)}
                      sx={{
                        mb: 1,
                        whiteSpace: "nowrap",
                        fontSize: { xs: "0.75rem", sm: "1rem" }, // Responsive font size
                        px: { xs: 1, sm: 2 },
                      }}
                    >
                      Refuser
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" sx={{ p: 3 }}>
                    Aucune demande pour le moment.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SuperAdminsTable;
