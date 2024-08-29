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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Footer from "../shared/Foorter";
import Navbar from "../shared/dashboard-navbar";
import SearchIcon from "@mui/icons-material/Search";

const SuperAdminsTable = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [adminData, setAdminData] = useState({
    nom: "",
    prenom: "",
    adresse_mail: "",
  });
  const queryRef = useRef(null);

  useEffect(() => {
    const fetchSuperAdmins = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/superadmin/admins/super_admins/`
      );
      setSuperAdmins(response.data);
    };
    fetchSuperAdmins();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/superadmin/admin/delete/${id}/`
    );
    setSuperAdmins(superAdmins.filter((admin) => admin.id !== id));
    setOpen(false);
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setAdminData({
      nom: admin.nom,
      prenom: admin.prenom,
      adresse_mail: admin.adresse_mail,
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/superadmin/admin/update/${selectedAdmin.id}/`,
      adminData
    );
    setSuperAdmins(
      superAdmins.map((admin) =>
        admin.id === selectedAdmin.id ? { ...admin, ...adminData } : admin
      )
    );
    setEditOpen(false);
  };

  const openModal = (admin) => {
    setSelectedAdmin(admin);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const closeEditModal = () => {
    setEditOpen(false);
  };

  const handleQueryChange = async (event) => {
    event.preventDefault();
    const query = queryRef.current?.value.toLowerCase();

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/superadmin/admins/search_super_admins/?query=${query}`
      );
      setSuperAdmins(response.data);
    } catch (error) {
      console.error("There was an error fetching the professionnels!", error);
    }
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography variant="h4">Super Admins</Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Box
              component="form"
              onSubmit={handleQueryChange}
              sx={{ display: "flex", gap: 2 }}
            >
              <TextField
                fullWidth
                placeholder="Rechercher des super admins"
                onChange={handleQueryChange}
                inputProps={{ ref: queryRef }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Card sx={{ mt: 4 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}
                    >
                      Nom
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}
                    >
                      Prénom
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {superAdmins.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.id}</TableCell>
                      <TableCell>{client.nom}</TableCell>
                      <TableCell>{client.prenom}</TableCell>
                      <TableCell>{client.adresse_mail}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(client)}
                          sx={{
                            backgroundColor: "#e0e0e0",
                            color: "#333",
                            "&:hover": { backgroundColor: "#d0d0d0" },
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => openModal(client)}
                          sx={{
                            backgroundColor: "#e0e0e0",
                            color: "#333",
                            "&:hover": { backgroundColor: "#d0d0d0" },
                            ml: 2,
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Container>
      </Box>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Vous êtes sûr que vous voulez supprimer cet utilisateur ?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(selectedAdmin.id)}
            >
              Confirmer
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={closeModal}
              sx={{ ml: 2 }}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={editOpen}
        onClose={closeEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modifier l'utilisateur
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom"
              name="nom"
              value={adminData.nom}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Prénom"
              name="prenom"
              value={adminData.prenom}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="adresse_mail"
              value={adminData.adresse_mail}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditSubmit}
            >
              Enregistrer
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={closeEditModal}
              sx={{ ml: 2 }}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SuperAdminsTable;
