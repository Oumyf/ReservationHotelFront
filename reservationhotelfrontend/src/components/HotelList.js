import React, { useEffect, useState } from 'react';
import './HotelList.css'; // Make sure to create and import your CSS file

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    try {
      console.log('Fetching hotels...');
      const response = await fetch('http://localhost:8000/api/hotels');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response received:', data);
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Unable to fetch hotels. Please try again later.');
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  console.log('Current hotels state:', hotels);

  return (
    <div>
      <h1>Liste des Hôtels</h1>
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={fetchHotels}>Réessayer</button>
        </div>
      )}
      {hotels.length === 0 ? (
        <p>Chargement des hôtels...</p>
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>
              <strong>{hotel.nom}</strong><br />
              <span>Adresse: {hotel.adresse}</span><br />
              <span>Note: {hotel.note}</span>
            </li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelList;
