// Header.js
import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from '../logo.png';
import { useNavigate } from "react-router-dom";
import AuthService from '../AuthService'; // Assurez-vous d'importer votre service d'authentification

const Header = () => {
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour gérer la connexion
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté en regardant le token
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = () => {
    if (departureDate && arrivalDate && destination) {
      navigate(`/search?departure=${departureDate}&arrival=${arrivalDate}&destination=${destination}`);
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const handleLogin = async () => {
    try {
      await AuthService.login(); 
      setIsLoggedIn(true);
      navigate('/'); 
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      alert("Erreur lors de la connexion. Veuillez réessayer."); // Alerte pour l'utilisateur
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout(); 
      setIsLoggedIn(false); 
      navigate('/'); 
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert("Erreur lors de la déconnexion. Veuillez réessayer."); // Alerte pour l'utilisateur
    }
  };

  return (
    <section className="recherche">
      <div className="overlay">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Logo Teranga Sénégal" /> 
          </div>
          <ul className="nav-links">
            <li>
              <a href="#">Accueil</a>
            </li>
            <li>
              <a href="#">À Propos</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div className="login-btn">
            {isLoggedIn ? (
              <button onClick={handleLogout}>Déconnexion</button>
            ) : (
              <button onClick={handleLogin}>Connexion</button>
            )}
          </div>
        </nav>
        <div className="hero-content">
          <h1>
            Découvrez et réservez les meilleurs hôtels du Sénégal en toute
            simplicité !
          </h1>
        </div>
        <div className="booking-form">
          <p>Filtrez les hotels par :</p>
          <div className="input-box">
            <label htmlFor="departure">Date de départ</label>
            <input 
              type="date" 
              id="departure" 
              value={departureDate} 
              onChange={(e) => setDepartureDate(e.target.value)} 
            />
          </div>
          <div className="input-box">
            <label htmlFor="arrival">Date d'arrivée</label>
            <input 
              type="date" 
              id="arrival" 
              value={arrivalDate} 
              onChange={(e) => setArrivalDate(e.target.value)} 
            />
          </div>
          <div className="input-box">
            <label htmlFor="destination">Entrer votre destination</label>
            <input 
              type="text" 
              id="destination" 
              placeholder="Destination" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)} 
            />
          </div>
          <button className="search-btn" onClick={handleSearch}>Rechercher</button>
        </div>
      </div>
    </section>
  );
};

export default Header;
