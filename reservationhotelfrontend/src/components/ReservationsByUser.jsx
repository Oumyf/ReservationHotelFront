import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hotelDetails, setHotelDetails] = useState({});
  const [roomDetails, setRoomDetails] = useState({});

  // Récupérer l'ID de l'utilisateur connecté depuis le localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchReservations = async () => {
      if (!userId) {
        setLoading(false);
        setError("Aucun utilisateur connecté.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/reservations/user/${userId}`);
        setReservations(response.data);

        // Récupérer les détails des hôtels et des chambres
        const hotelIds = response.data.map(reservation => reservation.hotel_id);
        const roomIds = response.data.map(reservation => reservation.chambre_id);
        
        const hotelPromises = hotelIds.map(id => axios.get(`http://localhost:8000/api/hotels/${id}`));
        const roomPromises = roomIds.map(id => axios.get(`http://localhost:8000/api/chambres/${id}`));

        const hotelResponses = await Promise.all(hotelPromises);
        const roomResponses = await Promise.all(roomPromises);

        // Stocker les détails des hôtels et des chambres dans des objets
        const hotelMap = hotelResponses.reduce((acc, curr) => {
          acc[curr.data._id] = curr.data;
          return acc;
        }, {});

        const roomMap = roomResponses.reduce((acc, curr) => {
          acc[curr.data._id] = curr.data;
          return acc;
        }, {});

        setHotelDetails(hotelMap);
        setRoomDetails(roomMap);

      } catch (error) {
        setError(error.response ? error.response.data.message : "Erreur lors de la récupération des réservations");
      } finally {
        setLoading(false); 
      }
    };

    fetchReservations();
  }, [userId]);

  if (loading) return <p>Chargement des réservations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Vos réservations</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              <p><strong>Hôtel:</strong> {hotelDetails[reservation.hotel_id] ? hotelDetails[reservation.hotel_id].nom_hotel : 'Chargement du nom de l\'hôtel...'}</p>
              <p><strong>Chambre réservée:</strong> {roomDetails[reservation.chambre_id] ? roomDetails[reservation.chambre_id].nom : 'Chargement du nom de la chambre...'}</p>
              <p><strong>Prix de la chambre:</strong> {roomDetails[reservation.chambre_id] ? roomDetails[reservation.chambre_id].prix : 'Chargement du prix...'} FCFA</p>
              <p><strong>Date de début:</strong> {new Date(reservation.date_debut).toLocaleDateString()}</p>
              <p><strong>Date de fin:</strong> {new Date(reservation.date_fin).toLocaleDateString()}</p>
              <p><strong>Statut:</strong> {reservation.statut}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune réservation trouvée.</p>
      )}
    </div>
  );
};

export default UserReservations;
