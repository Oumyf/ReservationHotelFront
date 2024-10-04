import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css'; 
import hotel from './hotel.png';
import Swal from 'sweetalert2';  // Importer SweetAlert2

const SignupForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        email,
        password,
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
