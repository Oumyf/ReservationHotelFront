import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchHotelById } from '../HotelService';
import './HotelDetails.css'; 

const HotelDetails = () => {
    const { id } = useParams(); 
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const getHotelDetails = async () => {
            try {
                const data = await fetchHotelById(id);
                setHotel(data);
            } catch (err) {
                setError('Erreur lors de la récupération des données de l\'hôtel');
            } finally {
                setLoading(false);
            }
        };

        getHotelDetails();
    }, [id]); 

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!hotel) return <div>Aucun hôtel trouvé</div>;

    const handleDiscoverClick = () => {
        navigate(`/liste_chambres/${id}`); // Rediriger vers la liste des chambres de cet hôtel
    };

    return (
        <div className="hotel-details-container">
            {/* ... Autres sections ... */}
            <button className="discover-button" onClick={handleDiscoverClick}>
                En savoir plus
            </button>
        </div>
    );
};

export default HotelDetails;
