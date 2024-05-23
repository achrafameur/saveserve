import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Modal, Button, Box, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Foorter';

const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientData, setClientData] = useState({ nom: '', prenom: '', adresse_mail: '' });

  useEffect(() => {
    const fetchClients = async () => {
      const response = await axios.get('http://localhost:7000/admins/clients/');
      setClients(response.data);
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:7000/admin/delete/${id}/`);
    setClients(clients.filter(client => client.id !== id));
    setOpen(false);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setClientData({ nom: client.nom, prenom: client.prenom, adresse_mail: client.adresse_mail });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    await axios.put(`http://localhost:7000/admin/update/${selectedClient.id}/`, clientData);
    setClients(clients.map(client => client.id === selectedClient.id ? { ...client, ...clientData } : client));
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

  return (
    <>
    <Navbar />
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: 2 }}>
        Clients
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
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
                <IconButton onClick={() => handleEdit(client)} sx={{color:'green'}}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => openModal(client)} sx={{color:'red'}}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Vous êtes sûr que vous voulez supprimer cet utilisateur ?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleDelete(selectedClient.id)}>Confirmer</Button>
            <Button variant="contained" color="secondary" onClick={closeModal} sx={{ ml: 2 }}>Annuler</Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={editOpen}
        onClose={closeEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
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
            <Button variant="contained" color="primary" onClick={handleEditSubmit}>Enregistrer</Button>
            <Button variant="contained" color="secondary" onClick={closeEditModal} sx={{ ml: 2 }}>Annuler</Button>
          </Box>
        </Box>
      </Modal>
    </TableContainer>
    <Footer />
    </>
  );
};

export default ClientsTable;
