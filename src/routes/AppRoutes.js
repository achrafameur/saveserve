// AppRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../auth/signup/SignUp";
import Login from "../auth/Login";
import ProfessionnelDashboard from "../professionnel";
import ClientDashboard from "../client";
import FavoriteDashboard from '../client/favorite'
import Panier from '../client/panier'
import SuperAdminDashboard from "../super_admin";
import ProtectedRoute from "../auth/ProtectedRoutes/ProtectedRoute";
import Profile from "../shared/Profile";
import SuperAdminsTable from "../super_admin/SuperAdminTable";
import ImageRequests from "../super_admin/imageRequests";
import ClientsTable from "../client/ClientsTable";
import ProfessionnelsTable from "../professionnel/ProfessionnelsTable";
import ClientSignUp from "../auth/signup/ClientSignUp";
import ProfessionalSignUp from "../auth/signup/ProfessionalSignUp";
import ManageAvailability from "../professionnel/menus/ManageAvailability";
import AddMenu from "../professionnel/menus/AddMenu";
import MenuDetails from "../professionnel/menus/MenuDetails";
import { DashboardLayout } from "../shared/dashboard-layout";
import AddAdmin from "../super_admin/addAdmin";
import VerifyProfessional from "../super_admin/verifyProsUsers";
import Commandes from "../client/commandes";
import CommandesPro from "../professionnel/commandesPro";
import AddLitige from "../client/addLitige";
import LitigesList from "../super_admin/LitigesList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/client" element={<ClientSignUp />} />
      <Route path="/signup/professionnel" element={<ProfessionalSignUp />} />
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
        path="/favoris"
        element={
          <ProtectedRoute>

            <FavoriteDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/commandes"
        element={
          <ProtectedRoute>

            <Commandes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/commandesPro"
        element={
          <ProtectedRoute>

            <CommandesPro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/panier"
        element={
          <ProtectedRoute>

            <Panier />
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
      <Route
        path="/admin/professionnels_to_verify"
        element={
          <ProtectedRoute>
            <VerifyProfessional />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute>
            <ImageRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ajouter-menu"
        element={
          <ProtectedRoute>
            <AddMenu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gerer-disponibilites"
        element={
          <ProtectedRoute>
            <ManageAvailability />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu/:menu_id"
        element={
          <ProtectedRoute>
            <MenuDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ajout-admin"
        element={
          <ProtectedRoute>
            <AddAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ajout-réclamation"
        element={
          <ProtectedRoute>
            <AddLitige />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/réclamations"
        element={
          <ProtectedRoute>
            <LitigesList />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
