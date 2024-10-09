import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './AddChambre.css';

const AddChambre = ({ fetchRooms, selectedRoom }) => {
  const [roomData, setRoomData] = useState({
    nom: '',
    type: '',
    prix: '',
    description: '',
    disponibilite: true,
    hotelId: '', // Assurez-vous que cela est bien renseigné
    image: null,
    nombreDePersonnes: '',
  });

  const [hotels, setHotels] = useState([]); // État pour stocker les hôtels

  // Récupérer les hôtels
  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/hotels');
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des hôtels:', error);
      }
    };

    getHotels(); // Appeler la fonction pour récupérer les hôtels
  }, []); // Le tableau vide garantit que cela ne s'exécute qu'une fois au chargement du composant

  // Pré-remplir le formulaire si une chambre est sélectionnée
  useEffect(() => {
    if (selectedRoom) {
      setRoomData(selectedRoom);
    }
  }, [selectedRoom]);

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    setRoomData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Gérer le changement des champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: name === 'disponibilite' ? value === 'true' : value,
    }));
  };

  // Gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(roomData).forEach((key) => {
      formData.append(key, roomData[key]);
    });
  
    try {
      const response = await fetch(`http://localhost:8000/api/chambres${selectedRoom ? `/${selectedRoom._id}` : ''}`, {
        method: selectedRoom ? 'PUT' : 'POST',
        body: formData,
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Erreur de mise à jour de la chambre');
      }
  
      await fetchRooms();
  
      Swal.fire('Success', selectedRoom ? 'Chambre mise à jour avec succès' : 'Chambre ajoutée avec succès', 'success');
  
      setTimeout(() => {
        setRoomData({
          nom: '',
          type: '',
          prix: '',
          description: '',
          disponibilite: true,
          hotelId: '',
          image: null,
          nombreDePersonnes: '',
        });
      }, 2000);
    } catch (error) {
      console.error('Erreur dans handleSubmit:', error);
      Swal.fire('Error', "Impossible d'ajouter ou de mettre à jour la chambre: " + error.message, 'error');
    }
  };
  


  return (
    <section className='AddChambre'>
    <div>
      <h2>{selectedRoom ? 'Modifier la Chambre' : 'Ajouter une Chambre'}</h2>
      <form onSubmit={handleSubmit} className='AddChambreForm'>
        <div>
          <label>
            Nom:
            <input type="text" name="nom" value={roomData.nom} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Type:
            <input type="text" name="type" value={roomData.type} onChange={handleChange} required />
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
            Hôtel:
            <select name="hotelId" value={roomData.hotelId} onChange={handleChange} required>
              <option value="" disabled>
                Sélectionner un hôtel
              </option>
              {hotels.map(hotel => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.nom}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
    </section>
  );
};

export default AddChambre;
