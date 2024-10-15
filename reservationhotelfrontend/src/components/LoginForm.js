import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la connexion. Veuillez vérifier vos informations.');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userRole', data.user.role);

      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: 'Vous êtes maintenant connecté!',
        confirmButtonText: 'OK',
      });

      // Redirect based on the user role
      if (data.user.role === 'hotel') {
        navigate('/dashboard'); // Redirect to dashboard for hotels
      } else if (data.user.role === 'client') {
        navigate('/payment'); // Redirect to payment page for clients
      } else {
        navigate('/dashboard'); // Default redirection to dashboard for other roles
      }

    } catch (error) {
      setErrorMessage(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: error.message,
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Connexion</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="signup-link">
          Pas de compte ? <a href="/inscription">Inscrivez-vous ici</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
