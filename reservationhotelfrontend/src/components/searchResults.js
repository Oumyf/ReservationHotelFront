import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [chambres, setChambres] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const departureDate = params.get("departure");
    const arrivalDate = params.get("arrival");
    const destination = params.get("destination");
    const tarifMin = params.get("tarifMin");
    const tarifMax = params.get("tarifMax");
    const nombrePersonnes = params.get("nombrePersonnes");

    // Appeler l'API avec les filtres
    axios.get("http://localhost:8000/api/chambres/search", {
        params: {
        departure: departureDate,
        arrival: arrivalDate,
        destination,
        tarifMin,
        tarifMax,
        nombrePersonnes,
      },
    })
    .then(response => setChambres(response.data))
    .catch(error => console.error("Erreur lors de la récupération des chambres :", error));
  }, [location.search]);

  return (
    <div>
      <h2>Résultats de la recherche</h2>
      {chambres.map((chambre) => (
        <div key={chambre.id}>
          <h3>{chambre.nom}</h3>
          <p>Tarif: {chambre.prix} FCFA</p>
          <p>Capacité: {chambre.nombreDePersonnes} personnes</p>
          {/* Affichez d'autres détails selon vos besoins */}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
