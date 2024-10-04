// RoomList.js
import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import Swal from 'sweetalert2';
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/chambres');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des chambres');
      }
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Erreur', 'Impossible de charger les chambres', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="room-list-container">
      <h2>Liste des Chambres</h2>
      {loading ? (
        <p>Chargement...</p> // Loading message
      ) : (
        <div className="room-list">
          {rooms.length === 0 ? (
            <p>Aucune chambre disponible.</p>
          ) : (
            rooms.map((room) => (
              <RoomCard key={room._id} room={room} /> // Passing room prop here
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RoomList;
