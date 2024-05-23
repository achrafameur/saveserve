// AdminProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  if (!isAuthenticated || role !== 'super_admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminProtectedRoute;
