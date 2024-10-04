// PartnerHotelSection.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles (only main CSS)
import 'swiper/swiper-bundle.css'; // Use this for the main CSS styles

// Import required modules from Swiper
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import './PartnerHotelSection.css';  
import hotelImage from './hotel_partenaire.png';

const PartenaireHotelSection = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/hotels')
      .then(response => response.json())
      .then(data => setHotels(data))
      .catch(error => console.error("Error fetching hotels:", error));
  }, []);

  const handleExploreClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <section className="partenaire-hotels">
      <h2 className="title">Les Hotels Partenaires</h2>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation // Enable navigation
        pagination={{ clickable: true }} // Enable pagination
        modules={[Navigation, Pagination]} // Specify modules
      >
        {hotels.map((hotel) => (
          <SwiperSlide key={hotel._id}>
            <div className="hotel-card">
              <div className="hotel-info">
                <h3>{hotel.nom}</h3>
                <p>{hotel.description.slice(0, 300)}...</p>
                <button 
                  className="explore-btn" 
                  onClick={() => handleExploreClick(hotel._id)}
                >
                  Explorer
                </button>
              </div>
              <div className="hotel-image">
                <div className="overlay_image"></div>
                <img src={hotelImage} alt={hotel.nom} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PartenaireHotelSection;
