import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './AddChambre.css';

const AddChambre = ({ fetchRooms, selectedRoom, closeAddChambre, user }) => {
  const [roomData, setRoomData] = useState({
    nom: '',
    type: '',
    prix: '',
    description: '',
    disponibilite: true,
    hotelId: '', // On va le remplir automatiquement si l'utilisateur est un hôtel
    image: null,
    nombreDePersonnes: '',
  });

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // On suppose que l'utilisateur a un id d'hôtel s'il est connecté en tant qu'hôtel
  const isHotel = user && user.role === 'hotel'; // Assurez-vous que votre objet utilisateur a cette propriété

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

    getHotels();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      setRoomData(selectedRoom);
    }
  }, [selectedRoom]);

  useEffect(() => {
    // Si l'utilisateur est un hôtel, on assigne automatiquement l'id de l'hôtel
    if (isHotel && user.hotelId) {
      setRoomData((prevData) => ({
        ...prevData,
        hotelId: user.hotelId,
      }));
    }
  }, [isHotel, user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRoomData((prevData) => ({
      ...prevData,
      image: file,
    }));

    // Preview the selected image
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: name === 'disponibilite' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
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
      setImagePreview(null); // Reset image preview

    } catch (error) {
      console.error('Erreur dans handleSubmit:', error);
      Swal.fire('Error', "Impossible d'ajouter ou de mettre à jour la chambre: " + error.message, 'error');
    } finally {
      setLoading(false); // End loading state
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

          {/* Afficher le champ d'hôtel uniquement si l'utilisateur n'est pas un hôtel */}
          {!isHotel && (
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
          )}

          <div>
            <label>
              Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {imagePreview && <img src={imagePreview} alt="Aperçu de l'image" style={{ width: '100px', height: 'auto' }} />}
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Enregistrement...' : 'Enregistrer'}</button>
          <button type="button" onClick={() => { setRoomData({ nom: '', type: '', prix: '', description: '', disponibilite: true, hotelId: '', image: null, nombreDePersonnes: '' }); setImagePreview(null); closeAddChambre(); }}>Annuler</button>
        </form>
      </div>
    </section>
  );
};

export default AddChambre;
