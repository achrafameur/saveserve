import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Modal,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { getInitials } from "../utils/get-initials"; // Assurez-vous que le chemin d'importation est correct

const ProfessionnelsTable = () => {
  const [professionnels, setProfessionnels] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProfessionnel, setSelectedProfessionnel] = useState(null);
  const [professionnelData, setProfessionnelData] = useState({
    nom_organisme: "",
    adresse_mail: "",
    num_siret: "",
  });
  const queryRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProfessionnels = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admins/professionnels/`
      );
      setProfessionnels(response.data);
    };
    fetchProfessionnels();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/admin/delete/${id}/`
    );
    setProfessionnels(
      professionnels.filter((professionnel) => professionnel.id !== id)
    );
    setOpen(false);
  };

  const handleEdit = (professionnel) => {
    setSelectedProfessionnel(professionnel);
    setProfessionnelData({
      nom_organisme: professionnel.nom_organisme,
      adresse_mail: professionnel.adresse_mail,
      num_siret: professionnel.num_siret,
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setProfessionnelData({
      ...professionnelData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/admin/update/${selectedProfessionnel.id}/`,
      professionnelData
    );
    setProfessionnels(
      professionnels.map((professionnel) =>
        professionnel.id === selectedProfessionnel.id
          ? { ...professionnel, ...professionnelData }
          : professionnel
      )
    );
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

  const handleQueryChange = async (event) => {
    event.preventDefault();
    const query = queryRef.current?.value.toLowerCase();

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admins/search_professionnels/?query=${query}`
      );
      setProfessionnels(response.data);
    } catch (error) {
      console.error("There was an error fetching the professionnels!", error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Professionnels</Typography>
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
                  placeholder="Rechercher des professionnels"
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
          </Box>
          <Card sx={{mt:2}}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Image</TableCell>
                    <TableCell sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Nom de l'organisme</TableCell>
                    <TableCell sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Num Siret</TableCell>
                    <TableCell sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {professionnels.map((professionnel) => (
                    <TableRow key={professionnel.id}>
                      <TableCell>{professionnel.id}</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>{professionnel.nom_organisme}</TableCell>
                      <TableCell>{professionnel.adresse_mail}</TableCell>
                      <TableCell>{professionnel.num_siret}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(professionnel)}
                          sx={{ backgroundColor: '#e0e0e0', color: '#333', '&:hover': { backgroundColor: '#d0d0d0' } }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => openModal(professionnel)}
                          sx={{ backgroundColor: '#e0e0e0', color: '#333', '&:hover': { backgroundColor: '#d0d0d0' }, ml : 2 }}
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
              onClick={() => handleDelete(selectedProfessionnel.id)}
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
            Modifier les coordonnées de l'organisme
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom Organisme"
              name="nom_organisme"
              value={professionnelData.nom_organisme}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Num Siret"
              name="num_siret"
              value={professionnelData.num_siret}
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

export default ProfessionnelsTable;
