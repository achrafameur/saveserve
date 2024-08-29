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
  InputAdornment,
  Grid,
  Container,
  Card,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Navbar from "../shared/dashboard-navbar";
import Footer from "../shared/Foorter";
import SearchIcon from "@mui/icons-material/Search";

const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientData, setClientData] = useState({
    nom: "",
    prenom: "",
    adresse_mail: "",
  });
  const queryRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/superadmin/admins/clients/`
      );
      setClients(response.data);
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/superadmin/admin/delete/${id}/`
    );
    setClients(clients.filter((client) => client.id !== id));
    setOpen(false);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setClientData({
      nom: client.nom,
      prenom: client.prenom,
      adresse_mail: client.adresse_mail,
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/superadmin/admin/update/${selectedClient.id}/`,
      clientData
    );
    setClients(
      clients.map((client) =>
        client.id === selectedClient.id ? { ...client, ...clientData } : client
      )
    );
    setEditOpen(false);
  };

  const openModal = (client) => {
    setSelectedClient(client);
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
        `${process.env.REACT_APP_BACKEND_URL}/superadmin/admins/search_clients/?query=${query}`
      );
      setClients(response.data);
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
              <Typography variant="h4">Clients</Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Box component="form" onSubmit={handleQueryChange} sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Rechercher des clients"
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
          <Card sx={{ mt : 4}}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}>Nom</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}>Prénom</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(40 157 163 / 69%)', color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
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
              onClick={() => handleDelete(selectedClient.id)}
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
              value={clientData.nom}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Prénom"
              name="prenom"
              value={clientData.prenom}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="adresse_mail"
              value={clientData.adresse_mail}
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

export default ClientsTable;
