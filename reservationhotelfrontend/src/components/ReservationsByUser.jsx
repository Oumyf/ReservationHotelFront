import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [hotels, setHotels] = useState({});
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const fetchedReservations = response.data;
        setReservations(fetchedReservations);

        // Fetch hotel and room data for each reservation
        fetchedReservations.forEach(reservation => {
          fetchHotelAndRoomData(reservation);
        });
      } catch (error) {
        setError(error.response ? error.response.data.message : "Erreur lors de la récupération des réservations");
      } finally {
        setLoading(false); 
      }
    };

    const fetchHotelAndRoomData = async (reservation) => {
      try {
        // Fetch the hotel for this reservation
        const hotelResponse = await axios.get(`http://localhost:8000/api/hotels/${reservation.hotel_id}`);
        setHotels(prevHotels => ({ ...prevHotels, [reservation.hotel_id]: hotelResponse.data }));

        // Fetch the room for this reservation
        const roomResponse = await axios.get(`http://localhost:8000/api/chambres/${reservation.chambre_id}`);
        setRooms(prevRooms => ({ ...prevRooms, [reservation.chambre_id]: roomResponse.data }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'hôtel ou de la chambre:", error);
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
          {reservations.map((reservation) => {
            const hotel = hotels[reservation.hotel_id];
            const room = rooms[reservation.chambre_id];

            console.log('Reservation:', reservation); // Vérifiez la réservation
            console.log('Hotel:', hotel); // Vérifiez l'hôtel
            console.log('Room:', room); // Vérifiez la chambre

            return (
              <li key={reservation._id}>
                <p><strong>Hôtel:</strong> {hotel ? hotel.nom : 'Hôtel inconnu'}</p>
                <p><strong>Chambre réservée:</strong> {room ? room.nom : 'Chambre inconnue'}</p>
                <p><strong>Prix de la chambre:</strong> {room ? room.prix : 'N/A'} FCFA</p>
                <p><strong>Date de début:</strong> {new Date(reservation.date_debut).toLocaleDateString()}</p>
                <p><strong>Date de fin:</strong> {new Date(reservation.date_fin).toLocaleDateString()}</p>
                <p><strong>Statut:</strong> {reservation.statut}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Aucune réservation trouvée.</p>
      )}
    </div>
  );
};

export default UserReservations;
