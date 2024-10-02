import React from 'react';
import './PopularRooms.css';
import chambre from './chambre.png';

const PopularRooms = () => {
  return (
    <section className="hotel">
      <div className="top1">
        <h1>Top des chambres les plus demandées</h1>
        <p>Chacune de nos chambres lumineuses et inondées de lumière est équipée de tout ce dont vous pourriez avoir besoin pour un séjour confortable.</p>
      </div>
      <div className="hotel-section1">
        {[1, 2, 3].map((room, index) => (
          <div className="hotel-card1" key={index}>
            <img src={chambre} alt="Chambre Simple" />
            <h3>Hotel Radisson Blu</h3>
            <p>Chambre Simple</p>
            <div className="info">
              <span><i className="fas fa-bed"></i> 1 lit</span>
              <span><i className="fas fa-bath"></i> 1 salle de bain</span>
              <span><i className="fas fa-expand-arrows-alt"></i> 80 m²</span>
            </div>
            <div className="price">
              <span className="price-value">90 000 FCFA / nuitée</span>
              <span className="adults">2 adultes</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRooms;
