import React from 'react';
import './Header.css';
import fabi from './fabi.JPG';


const headerAdmin = ({ user }) => {
  return (
    <div className="headerAdminheaderAdmin">
      <div>
        <h1>Bonjour, <span>{user}</span></h1>
      </div>
      <div className="user-profile">
        <img src={"/path/to/profile-image.jpg"} alt="profile" className="profile-img" />
        <span>Mr Diagne</span>
      </div>
    </div>
  );
};

export default headerAdmin;
