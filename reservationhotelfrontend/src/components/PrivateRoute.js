import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage
  const userRole = user ? user.role : null;

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" />;
  }

  return children; // Render the children if user is authorized
};

export default PrivateRoute;
