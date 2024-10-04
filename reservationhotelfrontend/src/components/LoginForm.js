import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Importer SweetAlert2
import './LoginForm.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Remplacer l'URL ci-dessous par l'URL de ton API de connexion
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      // Si la connexion est réussie, afficher une alerte SweetAlert de succès
      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: 'Vous êtes maintenant connecté!',
        confirmButtonText: 'OK'
      });

      console.log('Connexion réussie', response.data);
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion. Veuillez vérifier vos informations.');

      // Si une erreur se produit, afficher une alerte d'erreur avec SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: 'Une erreur est survenue lors de la tentative de connexion. Veuillez réessayer.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Connexion</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="exemple@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Se connecter</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p className="signup-link">
          Vous n'avez pas de compte ? <a href="/inscription">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
