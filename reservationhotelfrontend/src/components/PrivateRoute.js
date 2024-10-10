import React from 'react';
import { Navigate } from 'react-router-dom';

// Simuler une fonction pour vérifier si l'utilisateur est connecté
const isAuthenticated = () => {
  // Par exemple, vérifier s'il y a un token dans le localStorage
  return localStorage.getItem('userToken') !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/connexion" />;
};

export default PrivateRoute;
