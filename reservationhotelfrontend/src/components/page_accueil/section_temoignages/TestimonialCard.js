import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ image, name, position, text, highlight }) => {
  return (
    <div className={`testimonial-card ${highlight ? 'highlight' : ''}`}>
      <div className="profile-container">
        <img src={image} alt={name} className="profile-img" />
      </div>
      <h3>{name}</h3>
      <p className="position">{position}</p>
      <p className="quote-text">
        <span className="quote-icon">“</span> {text}
      </p>
    </div>
  );
};

export default TestimonialCard;
