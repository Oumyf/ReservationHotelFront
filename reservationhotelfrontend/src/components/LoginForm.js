import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importer SweetAlert2
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection
import './LoginForm.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // État de chargement
  const navigate = useNavigate(); // Initialiser le hook pour la redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Démarrer le chargement

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      // Stocker le token et l'ID utilisateur dans le local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id); // Ajouter cette ligne

      // Afficher une alerte SweetAlert de succès
      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: 'Vous êtes maintenant connecté!',
        confirmButtonText: 'OK'
      });

      // Rediriger l'utilisateur vers la page d'accueil
      navigate('/'); // Remplacer par la route souhaitée après connexion

    } catch (error) {
      setErrorMessage('Erreur lors de la connexion. Veuillez vérifier vos informations.');
      // Afficher une alerte d'erreur avec SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: 'Une erreur est survenue lors de la tentative de connexion. Veuillez réessayer.',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false); // Arrêter le chargement
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
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Chargement...' : 'Se connecter'}
          </button>
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
