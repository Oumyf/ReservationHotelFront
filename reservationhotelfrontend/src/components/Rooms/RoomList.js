// RoomList.js

import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import AddChambre from './AddChambre';
import Swal from 'sweetalert2';
import Sidebar from '../Sidebar'; // Import Sidebar
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddChambre, setShowAddChambre] = useState(false);

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

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setShowAddChambre(true);
  };

  const handleDelete = async (roomId) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action ne peut pas être annulée!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/chambres/${roomId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la chambre');
        }
        fetchRooms();
        Swal.fire('Supprimé!', 'La chambre a été supprimée.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Erreur', 'Impossible de supprimer la chambre', 'error');
      }
    }
  };

  const handleAddRoom = () => {
    setShowAddChambre(true);
    setSelectedRoom(null);
  };

  const closeAddChambre = () => {
    setShowAddChambre(false);
  };

  return (
    <div className="room-list-container">
      <h2>Liste des Chambres</h2>
      <button className="btn-reserver" onClick={handleAddRoom}>Ajouter une Chambre</button>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="room-list">
          {rooms.length === 0 ? (
            <p>Aucune chambre disponible.</p>
          ) : (
            rooms.map((room) => (
              <RoomCard key={room._id} room={room} onEdit={handleEdit} onDelete={handleDelete} />
            ))
          )}
        </div>
      )}
      {showAddChambre && (
        <AddChambre 
          selectedRoom={selectedRoom} 
          setSelectedRoom={setSelectedRoom} 
          fetchRooms={fetchRooms} 
          closeAddChambre={closeAddChambre} 
        />
      )}
    </div>
  );
};

export default RoomList;
