import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRoomsByHotelId } from '../RoomService'; // Service pour récupérer les chambres
import './HotelRooms.css';


const HotelRooms = () => {
  const { hotelId } = useParams(); // Récupérer l'ID de l'hôtel depuis l'URL
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchRoomsByHotelId(hotelId); // Récupérer les chambres par ID d'hôtel
        setRooms(data);
      } catch (err) {
        setError('Erreur lors de la récupération des chambres');
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, [hotelId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (rooms.length === 0) {
    return <div>Aucune chambre trouvée pour cet hôtel.</div>;
  }

  return (
    <div className="hotel-rooms-container">
      <h2>Chambres disponibles</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>{room.nom} - {room.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default HotelRooms;
