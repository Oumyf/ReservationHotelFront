import React from 'react';
import './RoomCard.css';
import api from '../../api'

const RoomCard = ({ room, onEdit, onDelete }) => {
  const defaultImage = './hotel.png'; // Path to your default image
  const path = `http://localhost:8000/${room.image}`;
  const correctedPath = path.replace(/\\/g, '/'); // Remplace les \ par /
  
  // Vérifiez le chemin dans la console
  console.log(correctedPath); 
  
  return (
    <div className="room-card">
<img src={correctedPath} alt={room.nom} />


      <div className="room-info">
        <h3>{room.nom}</h3>
        <p>Prix: {room.prix.toLocaleString()} FCFA</p>
        <p>Disponible: {room.disponibilite ? "OUI" : "NON"}</p>
        <button className="reserve-button" onClick={() => onEdit(room)}>Modifier</button>
        <button className="delete-button" onClick={() => onDelete(room._id)}>Supprimer</button>
      </div>
    </div>
  );
};

export default RoomCard;
