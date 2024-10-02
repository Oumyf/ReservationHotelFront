import React, { useEffect, useState } from 'react';

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

      const data = await response.json(); // Convertir la réponse en JSON
      console.log('Response received:', data);
      setHotels(data); // Mettez à jour l'état avec les hôtels récupérés
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {hotels.length === 0 ? (
        <p>Chargement des hôtels...</p>
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>{hotel.nom}</li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelList;
