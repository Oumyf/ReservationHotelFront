import React from "react";
import './PartnerHotelSection.css';
import hotelImage from './hotel_partenaire.png'; 
const PartenaireHotels = () => {
  return (
    <section className="partenaire-hotels">
      <h2 className="title">Les Hotels Partenaires</h2>
      <div className="hotel-card">
        <div className="hotel-info">
          <h3>Radisson Blu Hotel</h3>
          <p>
            Profitez de cet hôtel au design moderne dans l'élégant quartier de
            Fann, sur la presqu'île du Cap-Vert. Vous disposerez de tout ce dont
            vous avez besoin dans ces 241 chambres contemporaines, y compris des
            équipements et des installations pratiques...
          </p>
          <button className="explore-btn">Explorer</button>
        </div>
        <div className="hotel-image">
        <div class="overlay_image"></div>
          <img src={hotelImage} alt="Radisson Blu Hotel" />
        </div>
      </div>
      <div className="pagination">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
};

export default PartenaireHotels;
