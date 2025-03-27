import React from 'react';
import './Footer.css'; // Assurez-vous de créer un fichier CSS pour la mise en forme

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">À Propos</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <div className="newsletter">
          <p>S'abonner à notre newsletter</p>
          <div className="newsletter-signup">
            <input type="email" placeholder="Adresse Email" />
            <button>OK</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
