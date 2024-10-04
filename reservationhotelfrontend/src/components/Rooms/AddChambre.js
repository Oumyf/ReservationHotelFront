import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importer SweetAlert
import './AddChambre.css'; // Importer le CSS pour styliser le formulaire

const AddChambre = () => {
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [nombrePersonnes, setNombrePersonnes] = useState(1);
  const [hotelId, setHotelId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('type', type);
    formData.append('prix', prix);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('nombreDePersonnes', nombrePersonnes);
    formData.append('hotelId', hotelId);

    try {
      const response = await fetch('http://localhost:8000/api/chambres', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Chambre ajoutée avec succès!',
          showConfirmButton: false,
          timer: 1500,
        });
        // Reset form fields after submission
        setNom('');
        setType('');
        setPrix('');
        setDescription('');
        setImage(null);
        setNombrePersonnes(1);
        setHotelId('');
        navigate('/liste_chambres'); // Rediriger vers la liste des chambres
      } else {
        const errorResponse = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorResponse.message || 'L\'ajout de la chambre a échoué',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur de connexion: ' + error.message,
      });
    }
  };

  return (
    <div className="add-chambre-container">
      <h2>Ajouter une Chambre</h2>
      <form onSubmit={handleSubmit} className="form-chambre">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Nombre de personnes"
          value={nombrePersonnes}
          onChange={(e) => setNombrePersonnes(e.target.value)}
          min="1"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="ID de l'Hôtel"
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          required
        />
        <button type="submit" className="btn-ajouter">Ajouter</button>
      </form>
    </div>
  );
};

export default AddChambre;
