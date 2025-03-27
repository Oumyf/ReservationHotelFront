import React from 'react';
import './HeaderAdmin.css';
import { FaBell } from 'react-icons/fa';  // Importer une icône de cloche

const HeaderAdmin = ({ user }) => {
  return (
    <div className="headerAdmin">
       <div>
        <h1>Bonjour, <span>{user}</span></h1>
      </div>
      <div className="user-profile">
        <span><FaBell className="notification-icon" /> Mr Diagne </span>
       </div>
    </div>
  );
};

export default HeaderAdmin;
