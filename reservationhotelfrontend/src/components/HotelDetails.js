import React from 'react';
import './HotelDetails.css'; // Assurez-vous d'inclure votre CSS
import hotel from './hotel.png';
import chambre from './chambrebanniere.png';
import restaurant from './restaurant.png';
import salle_gym from './salle_gym.png';
import salle_reunion from './salle_reunion.png';
import spa from './spa.png'


const HotelDetails = () => {
  return (
    <div className="hotel-details">
      <section className="hotel-banner">
        <img
          src={hotel} // Modifie l'URL de l'image
          alt="Hotel"
          className="hotel-banner-image"
        />
        <div className="hotel-banner-text">
          <h1>Chambre Deluxe</h1>
          <p>Venez profiter d'un séjour luxueux et inoubliable</p>
        </div>
      </section>

      <section className="hotel-info">
        <div className="hotel-cards">
          <div className="hotel-card">
            <img src={chambre} alt="Image 1" />
            <h3>Nos Chambres</h3>
            <p>Découvrez nos chambres élégantes et confortables.</p>
          </div>
          <div className="hotel-card">
            <img src={restaurant} alt="Image 2" />
            <h3>Restaurant Gourmet</h3>
            <p>Savourez nos plats préparés par des chefs talentueux.</p>
          </div>
          <div className="hotel-card">
            <img src={salle_gym} alt="Image 3" />
            <h3>Salle de Gym</h3>
            <p>Restez en forme même en voyage.</p>
          </div>
          <div className="hotel-card">
            <img src={salle_reunion} alt="Image 4" />
            <h3>Salle de réunion</h3>
            <p>Détendez-vous avec un cocktail au bar de l'hôtel.</p>
          </div>
          <div className="hotel-card">
            <img src={spa} alt="Image 5" />
            <h3>Spa et Bien-être</h3>
            <p>Profitez de soins relaxants dans notre spa de luxe.</p>
          </div>
          <div className="hotel-card">
            <img src={hotel} alt="Image 6" />
            <h3>Piscine</h3>
            <p>Plongez dans notre piscine et profitez du soleil.</p>
          </div>
        </div>
      </section>

      <section className="hotel-amenities">
        <h2>Nos Equipements</h2>
        <div className="amenities-grid">
          <div className="amenity-item">Wi-Fi Gratuit</div>
          <div className="amenity-item">Parking Sécurisé</div>
          <div className="amenity-item">Service en Chambre</div>
          <div className="amenity-item">Climatisation</div>
          <div className="amenity-item">Navette Aéroport</div>
          <div className="amenity-item">Conciergerie</div>
        </div>
      </section>

      <footer className="hotel-footer">
        <p>© 2024 Keur Teranga. Tous droits réservés.</p>
        <div className="footer-social">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default HotelDetails;
