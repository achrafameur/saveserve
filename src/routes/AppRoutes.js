// AppRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../auth/signup/SignUp";
import Login from "../auth/Login";
import ProfessionnelDashboard from "../professionnel";
import ClientDashboard from "../client";
import SuperAdminDashboard from "../super_admin";
import ProtectedRoute from "../auth/ProtectedRoute";
import Profile from "../shared/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
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
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
