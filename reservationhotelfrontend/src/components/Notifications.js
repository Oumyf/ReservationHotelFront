import React from 'react';

const Notifications = ({ notifications }) => {
  return (
    <div className="notifications">
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>Aucune nouvelle notification.</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
