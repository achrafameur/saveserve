import "./App.css";
import React, { useContext, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./auth/AuthContext";
// import { BrowserRouter as Router } from "react-router-dom";
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardNavbar from "./shared/dashboard-navbar";
import DashboardSidebar from "./shared/dashboard-sidebar";
import { AuthContext } from "./auth/AuthContext";

const AppLayout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  console.log(isAuthenticated)
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {isAuthenticated && (
        <DashboardNavbar onToggleSidebar={handleToggleSidebar} />
      )}
      {isAuthenticated && (
        <DashboardSidebar
          open={isSmallScreen ? false : isSidebarOpen}
          onClose={handleToggleSidebar}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          mt: isAuthenticated ? "64px" : 0, // Adjust top margin when navbar is present
          ml: isAuthenticated ? (isSmallScreen ? "0" : "240px") : "0", // Adjust left margin for sidebar on larger screens
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AuthProvider>
  );
}

export default App;
