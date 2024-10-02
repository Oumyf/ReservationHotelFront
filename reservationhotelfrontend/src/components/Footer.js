import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
        <div className="footer-left">
            <img src="path/to/logo.png" alt="Company Logo" className="logo" />
            <ul className="footer-menu">
                <li><a href="#">Accueil</a></li>
                <li><a href="#">À Propos</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
        <div className="footer-middle">
            <ul className="social-links">
                <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
            </ul>
        </div>
        <div className="footer-right">
            <p>&copy; 2024 Teranga Sénégal. Tous droits réservés.</p>
        </div>
    </div>
</footer>
  );
};

export default Footer;
