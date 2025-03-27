import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './AddChambre.css';

const AddChambre = ({ fetchRooms, closeAddChambre, selectedRoom }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null; 
  const hotelId = userId; 
  console.log(userId);

  const [roomData, setRoomData] = useState({
    nom: selectedRoom?.nom || '',
    type: selectedRoom?.type || '',
    prix: selectedRoom?.prix || '',
    description: selectedRoom?.description || '',
    disponibilite: selectedRoom?.disponibilite ?? true,
    image: null,
    nombreDePersonnes: selectedRoom?.nombreDePersonnes || '',
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRoomData((prevData) => ({
      ...prevData,
      image: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hotelId) {
        Swal.fire('Erreur', "L'ID de l'hôtel est manquant. Veuillez vous reconnecter.", 'error');
        return;
    }

    setLoading(true);
    const formData = new FormData();
    
    // Ajoutez toutes les données de la chambre
    Object.entries({ ...roomData, hotelId }).forEach(([key, value]) => {
        // N'ajoutez pas l'image si aucune nouvelle image n'est sélectionnée
        if (key === 'image' && !value) {
            // Si aucune nouvelle image n'est choisie, n'ajoutez rien
        } else {
            formData.append(key, value);
        }
    });

    try {
        const response = selectedRoom
            ? await fetch(`http://localhost:8000/api/chambres/${selectedRoom._id}`, {
                method: 'PUT',
                body: formData,
              })
            : await fetch('http://localhost:8000/api/chambres', {
                method: 'POST',
                body: formData,
              });

        if (response.ok) {
            Swal.fire('Succès', selectedRoom ? 'Chambre mise à jour avec succès' : 'Chambre ajoutée avec succès', 'success');
            fetchRooms();
            closeAddChambre();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        Swal.fire('Erreur', error.message || "Erreur lors de l'ajout ou de la mise à jour de la chambre", 'error');
        console.error('Erreur:', error);
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="add-chambre">
      <h2>{selectedRoom ? 'Modifier la Chambre' : 'Ajouter une Chambre'}</h2>
      <form onSubmit={handleSubmit} className="AddChambreForm">
        <div>
          <div>
            <label>
              Nom:
              <input type="text" name="nom" value={roomData.nom} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Type:
              <select name="type" value={roomData.type} onChange={handleChange} required>
                <option value="">Sélectionnez un type</option>
                <option value="simple">Simple</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              Prix:
              <input type="number" name="prix" value={roomData.prix} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea name="description" value={roomData.description} onChange={handleChange} required />
            </label>
          </div>
          <div className="form-row">
            <div>
              <label>
                Nombre de Personnes:
                <input type="number" name="nombreDePersonnes" value={roomData.nombreDePersonnes} onChange={handleChange} required />
              </label>
            </div>
            <div>
              <label>
                Disponibilité:
                <select name="disponibilite" value={roomData.disponibilite.toString()} onChange={handleChange} required>
                  <option value="true">Disponible</option>
                  <option value="false">Indisponible</option>
                </select>
              </label>
            </div>
          </div>
          <div>
            <label>
              Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {imagePreview && <img src={imagePreview} alt="Aperçu de l'image" style={{ width: '100px', height: 'auto' }} />}
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : selectedRoom ? 'Mettre à Jour' : 'Ajouter'}
        </button>
        <button
          type="button"
          onClick={() => {
            setRoomData({
              nom: '',
              type: '',
              prix: '',
              description: '',
              disponibilite: true,
              image: null,
              nombreDePersonnes: '',
            });
            setImagePreview(null);
            closeAddChambre();
          }}
        >
          Annuler
        </button>
      </form>
    </div>
  );
};

export default AddChambre;
