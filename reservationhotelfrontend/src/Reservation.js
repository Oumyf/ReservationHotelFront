// src/pages/Reservation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Reservation = ({ reservationId }) => {
  const navigate = useNavigate();

  const handleReservation = () => {
    const userToken = localStorage.getItem('userToken');
    
    if (!userToken) {
      // Stocker temporairement l'ID de la réservation dans le localStorage
      localStorage.setItem('pendingReservationId', reservationId);
      // Rediriger vers la page de connexion
      navigate('/connexion');
    } else {
      // Rediriger directement vers la page de paiement
      navigate(`/payment?reservationId=${reservationId}`);
    }
  };

  return (
    <div>
      <h2>Page de réservation</h2>
      <button onClick={handleReservation} className="btn-reserver">
        Réserver
      </button>
    </div>
  );
};

export default Reservation;
