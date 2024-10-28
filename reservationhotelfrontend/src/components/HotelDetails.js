import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import hotel from './hotel.png';
import './HotelDetails.css';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [chambres, setChambres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avis, setAvis] = useState([]);
  const [nouvelAvis, setNouvelAvis] = useState({ contenu: '', note: 0 });
  const [auteurs, setAuteurs] = useState({});
   // Pagination settings
   const [currentPage, setCurrentPage] = useState(1);
   const avisPerPage = 5; // Nombre d'avis par page

   // Calculate the avis to show on the current page
   const indexOfLastAvis = currentPage * avisPerPage;
   const indexOfFirstAvis = indexOfLastAvis - avisPerPage;
   const currentAvis = avis.slice(indexOfFirstAvis, indexOfLastAvis);

   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [selectedChambre, setSelectedChambre] = useState(null);
  const [reservationInfo, setReservationInfo] = useState({
    date_debut: '',
    date_fin: '',
    email: '',
    nom: '',
  });
  const [hotelData, setHotelData] = useState({});
  const [reservationId, setReservationId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null; 
    console.log(userId);
  const navigate = useNavigate();

  const fetchAvis = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/avis/hotel/${hotelId}`);
      setAvis(response.data);
      fetchAuteurs(response.data); // Appeler fetchAuteurs après avoir récupéré les avis
    } catch (error) {
      console.error("Erreur lors de la récupération des avis:", error);
    }
  };

  const fetchAuteurs = async (avisList) => {
    const auteursIds = avisList.map(avis => avis.auteur);
    try {
        const response = await axios.get(`http://localhost:8000/api/users`, {
            params: { ids: auteursIds } // Passer les IDs d'auteurs en tant que paramètres
        });

        console.log("Réponse API auteurs:", response.data); // Pour vérifier les données reçues

        const auteursData = response.data.reduce((acc, auteur) => {
            acc[auteur._id] = auteur.nom; // Utiliser `_id` pour lier l'auteur avec l'avis
            return acc;
        }, {});

        setAuteurs(auteursData);
    } catch (error) {
        console.error("Erreur lors de la récupération des auteurs:", error);
    }
};

  const handleAvisSubmit = async () => {
    if (!userId) {
        alert('Veuillez vous connecter pour soumettre un avis.');
        navigate('/connexion');
        return;
    }

    // Vérifiez si au moins une des deux options est remplie
    if (!nouvelAvis.contenu && nouvelAvis.note <= 0) {
        alert('Veuillez fournir une note ou un commentaire.');
        return;
    }

    try {
        const response = await axios.post(`http://localhost:8000/api/avis`, {
            type: nouvelAvis.note > 0 ? 'note' : 'commentaire', // Détermine le type selon le contenu
            hotelId: hotelId,
            auteur: userId,
            contenu: nouvelAvis.contenu || null, // Utilise null si vide
            note: nouvelAvis.note > 0 ? nouvelAvis.note : null // Utilise null si pas de note
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setAvis([...avis, response.data]);
        setNouvelAvis({ contenu: '', note: 0 });
        fetchAuteurs([...avis, response.data]);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'avis:", error.response ? error.response.data : error);
        alert("Erreur lors de l'envoi de l'avis. Veuillez réessayer.");
    }
};




  const handleChangeAvis = (e) => {
    const { name, value } = e.target;
    setNouvelAvis(prev => ({ ...prev, [name]: value }));
  };

 
  const checkReservationStatus = async () => {
    if (!reservationId) return; // Ne pas vérifier si aucune réservation

    try {
      const response = await axios.get(`http://localhost:8000/api/reservations/${reservationId}/status`);
      if (response.data.status === 'confirmée') {
        alert('Votre réservation a été confirmée!');
        // Ici, vous pouvez rediriger l'utilisateur ou mettre à jour l'état
        // Par exemple, navigate('/confirmation');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut de la réservation:', error);
    }
  };

  useEffect(() => {
    // Vérification du statut de réservation toutes les 5 secondes
    const interval = setInterval(() => {
      checkReservationStatus();
    }, 5000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [reservationId]);

  const handleReservation = async () => {
    if (!userId) {
      alert('Veuillez vous connecter pour effectuer une réservation.');
      navigate('/connexion');
      return;
    }

    const { date_debut, date_fin, email, nom } = reservationInfo;

    // Validation côté client
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

    // Étape 1 : Créer la réservation (sans payer ici)
    const reservationDetails = {
      user_id: userId,
      hotel_id: hotelId,
      date_debut,
      date_fin,
      email,
      nom,
      chambre_id: selectedChambre.id,
      montant: selectedChambre.prix,
      statut: 'en attente',
    };
    console.log(reservationDetails);

    try {
      const response = await axios.post('http://localhost:8000/api/reservations', reservationDetails);
      if (response.data.paymentUrl) {
        // Rediriger vers l'URL de paiement
        window.location.href = response.data.paymentUrl;
        setReservationId(response.data.reservationId); // Sauvegarde l'ID de réservation
      } else {
        setError('Erreur lors de la création de la réservation.');
      }
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert('Erreur lors de la réservation. Veuillez réessayer.');
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
    fetchAvis(); // Ajouter l'appel ici pour récupérer les avis à l'initialisation
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
                {currentAvis.length > 0 ? (
                    currentAvis.map((item, index) => (
                        <div key={index} className="avis-item">
                            <p><strong>{auteurs[item.auteur] || 'Auteur inconnu'}</strong></p>
                            {item.note && <p>Note: {item.note} / 5</p>}
                            {item.contenu && <p>{item.contenu}</p>}
                        </div>
                    ))
                ) : (
                    <p>Aucun avis pour cet hôtel pour le moment.</p>
                )}
                
                {/* Pagination buttons */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(avis.length / avisPerPage) }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={currentPage === number ? 'active' : ''}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                {/* Formulaire de soumission d'avis */}
                <div className="form-avis">
                    <textarea
                        name="contenu"
                        value={nouvelAvis.contenu}
                        onChange={(e) => setNouvelAvis({ ...nouvelAvis, contenu: e.target.value })}
                        placeholder="Votre avis "
                    />
                    <select
                        name="note"
                        value={nouvelAvis.note}
                        onChange={(e) => setNouvelAvis({ ...nouvelAvis, note: parseInt(e.target.value) })}
                    >
                        <option value="0">Note </option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <button onClick={handleAvisSubmit}>Soumettre</button>
                </div>
            </div>
        </section>

      
      {selectedChambre && (
  <div className="reservation-modal">
    <h3>Réserver la chambre: {selectedChambre.nom}</h3>
    <p>Type: {selectedChambre.type}</p>
    <p>Prix: {selectedChambre.prix} FCFA / nuitée</p>
    
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
