// Header.js
import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../logo.png";
import { useNavigate } from "react-router-dom";
import AuthService from "../AuthService"; // Assurez-vous d'importer votre service d'authentification
import Swal from "sweetalert2";

const Header = () => {
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [destination, setDestination] = useState("");
  const [disponibilite, setDisponibilite] = useState("");
  const [minPrix, setMinPrix] = useState("");
  const [maxPrix, setMaxPrix] = useState("");
  const [nombreDePersonnes, setNombreDePersonnes] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 


  const navigate = useNavigate();

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté en regardant le token
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = () => {
    // Construire la requête de recherche avec des paramètres
    const queryParams = new URLSearchParams();
    if (departureDate) queryParams.append("departure", departureDate);
    if (arrivalDate) queryParams.append("arrival", arrivalDate);
    if (destination) queryParams.append("destination", destination);
    if (disponibilite) queryParams.append("disponibilite", disponibilite);
    if (minPrix) queryParams.append("minPrix", minPrix);
    if (maxPrix) queryParams.append("maxPrix", maxPrix);
    if (nombreDePersonnes)
      queryParams.append("nombreDePersonnes", nombreDePersonnes);

    navigate(`/search?${queryParams.toString()}`);
  };

  const handleLogin = async () => {
    try {
      await AuthService.login();
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Erreur lors de la connexion. Veuillez réessayer."); // Alerte pour l'utilisateur
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout(); // Utilisez AuthService pour se déconnecter
      Swal.fire({
        icon: "success",
        title: "Déconnexion réussie",
        text: "Vous avez été déconnecté avec succès!",
        confirmButtonText: "OK",
      });
      navigate("/"); // Redirigez vers la page de connexion
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur de déconnexion",
        text: error.message,
        confirmButtonText: "OK",
      });
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
            <label htmlFor="disponibilite">Disponibilité</label>
            <select
              id="disponibilite"
              value={disponibilite}
              onChange={(e) => setDisponibilite(e.target.value)}
            >
              <option value="">Choisir</option>
              <option value="true">Disponible</option>
              <option value="false">Non disponible</option>
            </select>
          </div>
          <div className="input-box">
            <label htmlFor="minPrix">Prix minimum</label>
            <input
              type="number"
              id="minPrix"
              placeholder="Prix minimum"
              value={minPrix}
              onChange={(e) => setMinPrix(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="maxPrix">Prix maximum</label>
            <input
              type="number"
              id="maxPrix"
              placeholder="Prix maximum"
              value={maxPrix}
              onChange={(e) => setMaxPrix(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="nombreDePersonnes">Nombre de personnes</label>
            <input
              type="number"
              id="nombreDePersonnes"
              placeholder="Nombre de personnes"
              value={nombreDePersonnes}
              onChange={(e) => setNombreDePersonnes(e.target.value)}
            />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Rechercher
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
