import React, { useState } from "react";
import "./Header.css";
import logo from '../logo.png';
import chambre_banniere from './chambrebanniere.png';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Vérifier que tous les champs sont remplis avant de naviguer
    if (departureDate && arrivalDate && destination) {
      // Rediriger vers la page de résultats de recherche avec les paramètres
      navigate(`/search?departure=${departureDate}&arrival=${arrivalDate}&destination=${destination}`);
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // Filtrer les recettes en fonction du terme de recherche
//   const filteredRecettes = recettes.filter(recette =>
//     recette.nom.toLowerCase().includes(searchTerm.toLowerCase())
// );

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
            <button>Connexion</button>
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
