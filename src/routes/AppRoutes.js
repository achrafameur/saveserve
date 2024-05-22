import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../auth/signup/SignUp";
import ClientSignUp from "../auth/signup/ClientSignUp";
import ProfessionalSignUp from "../auth/signup/ProfessionalSignUp";
import Login from "../auth/Login";
import ProfessionnelDashboard from "../professionnel";
import ClientDashboard from "../client";
import SuperAdminDashboard from "../super_admin";
import ProtectedRoute from "../auth/ProtectedRoute";
import Profile from "../shared/Profile";

const AppRoutes = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/client" element={<ClientSignUp />} />
        <Route path="/signup/professional" element={<ProfessionalSignUp />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {isAuthenticated && (
          <>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professionnel"
              element={
                <ProtectedRoute>
                  <ProfessionnelDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client"
              element={
                <ProtectedRoute>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/super_admin"
              element={
                <ProtectedRoute>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
