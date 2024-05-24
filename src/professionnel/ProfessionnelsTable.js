import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Modal, Button, Box, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Foorter';

const ProfessionnelsTable = () => {
  const [professionnels, setProfessionnels] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProfessionnel, setSelectedProfessionnel] = useState(null);
  const [professionnelData, setProfessionnelData] = useState({ nom: '', prenom: '', adresse_mail: '' });

  useEffect(() => {
    const fetchProfessionnels = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admins/professionnels/`);
      setProfessionnels(response.data);
    };
    fetchProfessionnels();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/delete/${id}/`);
    setProfessionnels(professionnels.filter(professionnel => professionnel.id !== id));
    setOpen(false);
  };

  const handleEdit = (professionnel) => {
    setSelectedProfessionnel(professionnel);
    setProfessionnelData({ nom: professionnel.nom, prenom: professionnel.prenom, adresse_mail: professionnel.adresse_mail });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setProfessionnelData({ ...professionnelData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/update/${selectedProfessionnel.id}/`, professionnelData);
    setProfessionnels(professionnels.map(professionnel => professionnel.id === selectedProfessionnel.id ? { ...professionnel, ...professionnelData } : professionnel));
    setEditOpen(false);
  };

  const openModal = (professionnel) => {
    setSelectedProfessionnel(professionnel);
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
        Professionnels
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
          {professionnels.map((professionnel) => (
            <TableRow key={professionnel.id}>
              <TableCell>{professionnel.id}</TableCell>
              <TableCell>{professionnel.nom}</TableCell>
              <TableCell>{professionnel.prenom}</TableCell>
              <TableCell>{professionnel.adresse_mail}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(professionnel)} sx={{color:'green'}}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => openModal(professionnel)} sx={{color:'red'}}>
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
            <Button variant="contained" color="primary" onClick={() => handleDelete(selectedProfessionnel.id)}>Confirmer</Button>
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
              value={professionnelData.nom}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Prénom"
              name="prenom"
              value={professionnelData.prenom}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="adresse_mail"
              value={professionnelData.adresse_mail}
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

export default ProfessionnelsTable;
