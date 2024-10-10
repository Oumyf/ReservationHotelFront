import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChambreList.css';

const ChambreList = ({ hotelId }) => {
    const [chambres, setChambres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedChambre, setSelectedChambre] = useState(null);
    const [reservationInfo, setReservationInfo] = useState({
        date_debut: '',
        date_fin: '',
        email: '',
        nom: ''
    });
    

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handleReservation = async () => {
        // Vérifiez si l'utilisateur est connecté
        if (!userId) {
            alert('Veuillez vous connecter pour effectuer une réservation.');
            navigate('/connexion'); // Redirigez vers la page de connexion
            return;
        }
    
        // Vérifiez si tous les champs requis sont remplis
        if (!reservationInfo.date_debut || !reservationInfo.date_fin || !reservationInfo.email || !reservationInfo.nom) {
            alert('Tous les champs sont requis.');
            return;
        }
    
        // Vérifiez si une chambre a été sélectionnée
        if (!selectedChambre) {
            alert('Veuillez sélectionner une chambre avant de réserver.');
            return;
        }
    
        try {
            // Créer la réservation
            const response = await fetch('http://localhost:8000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId, // Utilisateur connecté
                    hotel_id: hotelId,
                    chambre_id: selectedChambre.id,
                    ...reservationInfo,
                    statut: 'pending'
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erreur lors de la création de la réservation: ${errorData.message || 'Erreur inconnue'}`);
            }
    
            const data = await response.json();
    
            // Rediriger vers la page de paiement avec l'ID de réservation
            navigate(`/payment?reservationId=${data.id}`);
            
            // Réinitialiser la sélection de chambre
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
        const fetchChambres = async (hotelId) => {
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
    
        fetchChambres();
    }, [hotelId]);

    if (loading) return <div>Chargement en cours...</div>;
    if (error) return <div>{error}</div>;

    return (
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

            {selectedChambre && (
                <div className="reservation-modal">
                    <h2>Réserver {selectedChambre.nom}</h2>
                    <label>
                        Date de début:
                        <input
                            type="date"
                            name="date_debut"
                            value={reservationInfo.date_debut}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Date de fin:
                        <input
                            type="date"
                            name="date_fin"
                            value={reservationInfo.date_fin}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={reservationInfo.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Nom:
                        <input
                            type="text"
                            name="nom"
                            value={reservationInfo.nom}
                            onChange={handleChange}
                        />
                    </label>
                    <button onClick={handleReservation}>Confirmer la réservation</button>
                    <button onClick={() => setSelectedChambre(null)}>Annuler</button>
                </div>
            )}
        </div>
    );
};

export default ChambreList;
