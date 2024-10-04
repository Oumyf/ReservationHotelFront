import React from 'react';
import './StatsOverview.css';

const StatsOverview = () => {
  return (
    <div className="stats-overview">
      <div className="stat-item">
        <h2>21</h2>
        <p>Réservations aujourd'hui</p>
      </div>
      <div className="stat-details">
        <div className="detail-box">Chambres: 94</div>
        <div className="detail-box">Réservations: 84</div>
        <div className="detail-box">Avis et Commentaires: 53</div>
      </div>
    </div>
  );
};

export default StatsOverview;
