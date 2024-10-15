import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage
  const userRole = user ? user.role : null;

  if (!user) {
    // If the user is not logged in, redirect to login page
    return <Navigate to="/connexion" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If the user's role is not allowed, redirect to NotFound or a forbidden page
    return <Navigate to="/not-authorized" />;
  }

  return children; // Render the children if user is authorized
};

export default PrivateRoute;
