import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">AXIL Hotel</div>
      <ul className="sidebar-menu">
        <li>Gestion des réservations</li>
        <li>Gestion des chambres</li>
        <li>Gestion des services</li>
        <li>Gestion des paiements</li>
      </ul>
    </div>
  );
};

export default Sidebar;
