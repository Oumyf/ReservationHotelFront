import React from 'react';
import { useLocation } from 'react-router-dom';
import './ConfirmationReservation.css';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {
    const location = useLocation();
    const hotelId = new URLSearchParams(location.search).get('hotelId');
    const userId = new URLSearchParams(location.search).get('userId');

    return (
        <div>
            <h1>Réservation</h1>
            <p>Votre réservation est en attente de payement</p>
            {/* <p>Hotel ID: {hotelId}</p>
            <p>User ID: {userId}</p> */}
             <p>Merci de votre réservation!</p>
             <Link to="/" className="btn">Retour à l'accueil</Link>
        </div>
    );
};

export default ConfirmationPage;
