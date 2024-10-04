import React, { useEffect, useState } from 'react';
import './ChambreList.css';

const ChambreList = ({ hotelId }) => {
    const [chambres, setChambres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchChambres();
    }, [hotelId]);

    if (loading) return <div>Chargement en cours...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="chambres-container">
            {chambres.map((chambre) => (
                <div key={chambre.id} className="chambre-card">
                    <img src={chambre.image} alt={chambre.nom} className="chambre-image" />
                    <div className="chambre-info">
                        <h2>{chambre.nom}</h2>
                        <h4>{chambre.type}</h4>
                        <span className="prix">{chambre.prix} FCFA / nuitée</span>
                        <button className="btn-reserver">Réserver</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChambreList;
