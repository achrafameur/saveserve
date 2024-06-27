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
  Typography,
  IconButton,
  Modal,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Footer from "../shared/Foorter";
import Navbar from "../shared/dashboard-navbar";

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

  useEffect(() => {
    const fetchSuperAdmins = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admins/super_admins/`
      );
      setSuperAdmins(response.data);
    };
    fetchSuperAdmins();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/delete/${id}/`);
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
      `${process.env.REACT_APP_BACKEND_URL}/admin/update/${selectedAdmin.id}/`,
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

  return (
    <>
      
      <TableContainer component={Paper}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, padding: 2 }}
        >
          Super Admins
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
            {superAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.nom}</TableCell>
                <TableCell>{admin.prenom}</TableCell>
                <TableCell>{admin.adresse_mail}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(admin)}
                    sx={{ color: "green" }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => openModal(admin)}
                    sx={{ color: "red" }}
                  >
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
      </TableContainer>
      
    </>
  );
};

export default SuperAdminsTable;
