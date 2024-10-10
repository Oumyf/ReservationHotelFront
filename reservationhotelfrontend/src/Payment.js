// src/pages/PaymentPage.js
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const reservationId = searchParams.get('reservationId');

  useEffect(() => {
    if (reservationId) {
      // Appel à l'API de paiement avec l'ID de réservation
      axios.post('http://localhost:8000/api/payments/pay', { reservationId })
        .then(response => {
          console.log('Paiement effectué:', response.data);
        })
        .catch(error => {
          console.error('Erreur lors du paiement:', error);
        });
    }
  }, [reservationId]);

  return (
    <div>
      <h2>Processus de paiement en cours pour la réservation {reservationId}...</h2>
    </div>
  );
};

export default Payment;
