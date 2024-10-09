import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css'; 
import Swal from 'sweetalert2'; 


const SignupForm = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        nom,
        email,
        password,
        telephone,
        adresse,
        role,
      });

      // Afficher une alerte de succès avec SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie',
        text: 'Vous avez été inscrit avec succès!',
        confirmButtonText: 'OK'
      });

      console.log('Inscription réussie', response.data);
    } catch (error) {
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');

      // Afficher une alerte d'erreur avec SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'inscription.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom complet"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
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
          <input
            type="text"
            placeholder="Numéro de téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
          <label>Rôle:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">Utilisateur</option>
            <option value="hotel">Hôtel</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="signup-btn">S'inscrire</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p className="signin-link">
          Vous avez déjà un compte ? <a href="/connexion">connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
