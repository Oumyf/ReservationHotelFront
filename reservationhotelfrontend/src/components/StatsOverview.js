import React from 'react';
import './StatsOverview.css';
import commentaire_icone from './octicon_comment-24.png';
import reservation_icone from './fluent-mdl2_reservation-orders.png';
import chambre_icone from './guidance_hotel-room.png';

const StatsOverview = () => {
  return (
    <div className="stats-overview">
      <div className="stat-item">
        <h2>21</h2>
        <p>Réservations aujourd'hui</p>
      </div>
      <div className="stat-details">
        <div className="detail-box">
          <img src={chambre_icone} alt="Chambres" />
          <p>Chambres</p>
          <h2>94</h2>
        </div>
        <div className="detail-box">
          <img src={reservation_icone} alt="Réservations" />
          <p>Réservations</p>
          <h2>84</h2>
        </div>
        <div className="detail-box">
          <img src={commentaire_icone} alt="Avis et Commentaires" />
          <p>Avis et Commentaires</p>
          <h2>53</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
