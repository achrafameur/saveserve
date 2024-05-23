// AppRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../auth/signup/SignUp";
import Login from "../auth/Login";
import ProfessionnelDashboard from "../professionnel";
import ClientDashboard from "../client";
import SuperAdminDashboard from "../super_admin";
import ProtectedRoute from "../auth/ProtectedRoutes/ProtectedRoute";
import Profile from "../shared/Profile";
import SuperAdminsTable from "../super_admin/SuperAdminTable";
import ClientsTable from "../client/ClientsTable";
import ProfessionnelsTable from "../professionnel/ProfessionnelsTable";

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
      <Route
        path="/admin/super_admins"
        element={
          <ProtectedRoute>
            <SuperAdminsTable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients"
        element={
          <ProtectedRoute>
            <ClientsTable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/professionnels"
        element={
          <ProtectedRoute>
            <ProfessionnelsTable />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
