import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import hotel from './hotel.png';
import './HotelDetails.css';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [chambres, setChambres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChambre, setSelectedChambre] = useState(null);
  const [reservationInfo, setReservationInfo] = useState({
    date_debut: '',
    date_fin: '',
    email: '',
    nom: '',
  });
  const [hotelData, setHotelData] = useState({});
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleReservation = async () => {
    if (!userId) {
      alert('Veuillez vous connecter pour effectuer une réservation.');
      navigate('/connexion');
      return;
    }

    const { date_debut, date_fin, email, nom } = reservationInfo;

    if (!date_debut || !date_fin || !email || !nom) {
      alert('Tous les champs sont requis.');
      return;
    }

    if (new Date(date_debut) >= new Date(date_fin)) {
      alert('La date de début doit être antérieure à la date de fin.');
      return;
    }

    if (!selectedChambre) {
      alert('Veuillez sélectionner une chambre avant de réserver.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          hotel_id: hotelId,
          chambre_id: selectedChambre.id,
          ...reservationInfo,
          statut: 'pending',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur lors de la création de la réservation: ${errorData.message || 'Erreur inconnue'}`);
      }

      const data = await response.json();
      navigate(`/payment?reservationId=${data.id}`);
      setSelectedChambre(null);
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert(`Erreur lors de la réservation: ${error.message}`);
    }
  };

  const handleChambreClick = (chambre) => {
    setSelectedChambre(chambre);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/hotels/${hotelId}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des données de l\'hôtel');
        const data = await response.json();
        setHotelData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'hôtel:', error);
        setError('Erreur lors de la récupération des données de l\'hôtel.');
      }
    };

    const fetchChambres = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/hotels/${hotelId}/chambres`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des chambres');
        const data = await response.json();
        setChambres(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des chambres:', error);
        setError('Erreur lors de la récupération des chambres.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
    fetchChambres();
  }, [hotelId]);

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="hotel-details">
      <section className="hotel-banner">
        <img src={hotel} alt="Hotel" className="hotel-banner-image" />
        <div className="hotel-banner-text">
          <h1>{hotelData.nom}</h1>
          <p>{hotelData.description}</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Chambres disponibles</h2>
        <div className="chambres-container">
          {chambres.map((chambre) => {
            const imagePath = `http://localhost:8000/${chambre.image}`.replace(/\\/g, '/');
            return (
              <div key={chambre.id} className="chambre-card">
                <img src={imagePath} alt={chambre.nom} className="chambre-image" />
                <div className="chambre-info">
                  <h2>{chambre.nom}</h2>
                  <h4>{chambre.type}</h4>
                  <span className="prix">{chambre.prix} FCFA / nuitée</span>
                  <button className="btn-reserver" onClick={() => handleChambreClick(chambre)}>Réserver</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Description de l'hôtel</h2>
        <div className="section-content">
          <p>{hotelData.description}</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Équipements</h2>
        <div className="section-content">
          <ul>
            {hotelData.equipements && hotelData.equipements.map((equipement, index) => (
              <li key={index}>{equipement}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Avis</h2>
        <div className="section-content">
          <p>Avis des clients sur cet hôtel.</p>
          {/* Ajoutez ici le code pour afficher les avis des clients */}
        </div>
      </section>

      {selectedChambre && (
        <div className="reservation-modal">
          <h3>Réserver {selectedChambre.nom}</h3>
          <label>
            Date de début:
            <input type="date" name="date_debut" onChange={handleChange} />
          </label>
          <label>
            Date de fin:
            <input type="date" name="date_fin" onChange={handleChange} />
          </label>
          <label>
            Nom:
            <input type="text" name="nom" onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <button onClick={handleReservation}>Confirmer la réservation</button>
          <button onClick={() => setSelectedChambre(null)}>Annuler</button>
        </div>
      )}

      <footer className="hotel-footer">
        <p>&copy; 2024 Keur Teranga. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HotelDetails;
