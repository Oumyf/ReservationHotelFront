import React from 'react';
import './RoomCard.css'; // Importer vos styles personnalisés ici

const RoomCard = ({ room, onEdit, onDelete }) => {
  return (
    <div className="room-card">
      <img
        src={room.image || 'default-image-url.jpg'} // Assurez-vous que cette URL est correcte
        alt={room.title}
        className="room-image"
      />
      <div className="room-info">
        <h3>{room.hotelName}</h3>
        <p>{room.roomType}</p>
        <div className="room-details">
          <div className="room-detail-item">
            <i className="fas fa-bed"></i> {room.beds} Lit(s)
          </div>
          <div className="room-detail-item">
            <i className="fas fa-bath"></i> {room.bathrooms} Salle de bain
          </div>
          <div className="room-detail-item">
            <i className="fas fa-users"></i> {room.maxGuests} invités
          </div>
          <div className="room-detail-item">
            <i className="fas fa-ruler-combined"></i> {room.size} m²
          </div>
        </div>
        <div className="room-price">
          <span>{room.prix} FCFA / nuitée</span>
        </div>
        <div className="room-actions">
          <button className="edit-button" onClick={() => onEdit(room)}>Modifier</button>
          <button className="delete-button" onClick={() => onDelete(room._id)}>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
