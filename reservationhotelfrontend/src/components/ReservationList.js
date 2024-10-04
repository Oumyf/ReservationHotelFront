import React from 'react';
import './ReservationList.css';

const ReservationList = ({ reservations }) => {
  return (
    <div className="reservation-list">
      <table>
        <thead>
          <tr>
            <th>Nom</th>        {/* Show user's name */}
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.nom}</td> {/* Show user name */}
              <td>{new Date(reservation.date_debut).toLocaleDateString()}</td>
              <td>{new Date(reservation.date_fin).toLocaleDateString()}</td>
              <td>{reservation.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
