// MenuView.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  TextField,
} from "@mui/material";

const MenuView = () => {
  const { menu_id } = useParams();
  const [menu, setMenu] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  // Récupérer les détails du produit depuis l'API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/professionnel/menu/${menu_id}/`
        );
        setMenu(response.data);
        setEditableFields(response.data);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      }
    };

    fetchProductDetails();
  }, [menu_id]);

  return (
    <Box>

      <div 
      style={{height:100,display:'flex',justifyContent:'center',alignItems:'center',fontSize:30,fontWeight:600,
        color:' rgb(40, 148, 163)'
      }}>
        Fiche du Menu
      </div>
      <div
      style={{display:'flex',justifyContent:'center'}}
      >
      <div style={{display:'flex',justifyContent:'center',gap:30,
       boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
       width:'70%',
       padding:20,
       borderRadius:10
      }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Paper
              elevation={3}
              style={{ padding: 0, width: "100%", height: "100%",borderRadius:10 }}
            >
              {menu && (
                <>
                  <img
                    src={menu.image !== "image/upload/null"
                      ? `${process.env.REACT_APP_CLOUDINARY_URL}/${menu.image}`
                      : `https://res.cloudinary.com/dubrka8it/image/upload/v1724978765/food_kyvzbf.png`}
                    alt={menu.nom}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                    }}
                  />
                </>
              )}
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Paper elevation={3} style={{ padding: "20px", width: "100%",borderRadius:10 }}>
              {menu && (
                <>
                  <TextField
                    label="Nom"
                    name="nom"
                    value={editableFields.nom || ""}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={1}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={editableFields.description || ""}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <TextField
                    label="Prix"
                    name="prix"
                    value={editableFields.prix || ""}
                    fullWidth
                    margin="normal"
                    type="number"
                    step="0.01"
                  />
                </>
              )}
            </Paper>
          </Box>
        </Grid>
      </div>
      </div>
    </Box>
  );
};

export default MenuView;
