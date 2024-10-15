import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './ReservationList.css';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]); // État pour stocker les utilisateurs
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(8);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reservations');
        setReservations(response.data);
        console.log("Réservations:", response.data); // Afficher les réservations
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
      }
    };
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data);
        console.log("Utilisateurs:", response.data); // Afficher les utilisateurs
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };
  
    fetchReservations();
    fetchUsers();
  }, []);
  

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-container">
      <Sidebar />
      <div className="reservation-list-container">
        <h1 className="title">Liste des Réservations</h1>
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Nom de l'Utilisateur</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
          {currentReservations.map((reservation) => {
  // Trouver l'utilisateur correspondant à user_id
  const user = users.find(user => user._id === reservation.user_id);
  return (
    <tr key={reservation._id}>
      <td>{user ? user.nom : 'Utilisateur inconnu'}</td> {/* Afficher le nom de l'utilisateur */}
      <td>{new Date(reservation.date_debut).toLocaleDateString()}</td>
      <td>{new Date(reservation.date_fin).toLocaleDateString()}</td>
      <td>{reservation.statut}</td>
    </tr>
  );
  })}

          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Précédent
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(reservations.length / reservationsPerPage)}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
