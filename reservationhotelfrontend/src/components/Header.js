import React from "react";
import "./Header.css";
import logo from '../logo.png';
import chambre_banniere from './chambrebanniere.png';

const Header = () => {
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
            <input type="date" id="departure" />
          </div>
          <div className="input-box">
            <label htmlFor="arrival">Date d'arrivée</label>
            <input type="date" id="arrival" />
          </div>
          <div className="input-box">
            <label htmlFor="destination">Entrer votre destination</label>
            <input type="text" id="destination" placeholder="Destination" />
          </div>
          <button className="search-btn">Rechercher</button>
        </div>
      </div>
    </section>
  );
};

export default Header;
