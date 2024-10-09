import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import AddChambre from './AddChambre'; // Make sure to import AddChambre
import Swal from 'sweetalert2';
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null); // New state for selected room

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
    setSelectedRoom(room); // Set the selected room for editing
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
        fetchRooms(); // Refresh the list of rooms after deletion
        Swal.fire('Supprimé!', 'La chambre a été supprimée.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Erreur', 'Impossible de supprimer la chambre', 'error');
      }
    }
  };

  return (
    <div className="room-list-container">
      <h2>Liste des Chambres</h2>
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
      {selectedRoom && (
        <AddChambre 
            selectedRoom={selectedRoom} 
            setSelectedRoom={setSelectedRoom} // Ajout de cette ligne
            fetchRooms={fetchRooms} 
        />
      )}
    </div>
  );
  
};

export default RoomList;
