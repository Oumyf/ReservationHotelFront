import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
    const location = useLocation();
    const hotelId = new URLSearchParams(location.search).get('hotelId');
    const userId = new URLSearchParams(location.search).get('userId');

    return (
        <div>
            <h1>Confirmation de Réservation</h1>
            <p>Votre réservation a été confirmée avec succès.</p>
            <p>Hotel ID: {hotelId}</p>
            <p>User ID: {userId}</p>
            <p>Merci de votre réservation!</p>
        </div>
    );
};

export default ConfirmationPage;
