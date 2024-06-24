import React from 'react';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import { Box } from '@mui/material'; // Importez Box pour un conteneur flexible

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

const DashboardContent = styled('div')({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto'
});

const DashboardLayout = ({ children }) => {
  return (
    <DashboardLayoutRoot>
      <Navbar />
      <Box display="flex" flexGrow={1}>
        <DashboardContent>
          {children}
        </DashboardContent>
      </Box>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
