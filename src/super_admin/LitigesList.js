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
  Grid,
  Container,
  Card,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const LitigesList = () => {
  const [litiges, setLitiges] = useState([]);
  const queryRef = useRef(null);

  useEffect(() => {
    const fetchLitiges = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/client/litiges/"
        );
        setLitiges(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des litiges :", error);
      }
    };
    fetchLitiges();
  }, []);

  const handleQueryChange = async (event) => {
    event.preventDefault();
    const query = queryRef.current?.value.toLowerCase();

    try {
      const response = await axios.get(
        `http://localhost:7000/client/litiges/?query=${query}`
      );
      setLitiges(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche des litiges :", error);
    }
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <div className="pageTitleHeader"
              style={{height:20}}>Litiges</div>
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
                placeholder="Rechercher des litiges"
                onChange={handleQueryChange}
                inputProps={{ ref: queryRef }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
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
                      sx={{
                        backgroundColor: "rgb(40 157 163 / 69%)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "rgb(40 157 163 / 69%)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Titre
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "rgb(40 157 163 / 69%)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {litiges.length > 0 ? (
                    litiges.map((litige) => (
                      <TableRow key={litige.id}>
                        <TableCell>{litige.id}</TableCell>
                        <TableCell>{litige.titre}</TableCell>
                        <TableCell>{litige.description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        Aucun litige disponible.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LitigesList;
