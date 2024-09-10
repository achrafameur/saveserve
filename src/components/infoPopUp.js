// InfoPopup.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const InfoPopup = ({ open, handleClose, message }) => {
  return (
    <Dialog open={open} onClose={handleClose}
    PaperProps={{
        sx: {
          borderRadius: '16px', 
        },
      }}
    >
      <DialogTitle
       style={{display:'flex',justifyContent:'center'}}
      >Information!</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions
      style={{display:'flex',justifyContent:'center'}}>
        <Button onClick={handleClose} color="primary"
        style={{
            background:
             "linear-gradient(45deg, rgba(42, 161, 92, 1) 12%, rgba(3, 162, 194, 1) 100%)",
              color:'white',
              borderRadius:10
          }}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoPopup;
