import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { io } from 'socket.io-client'; 
import Sidebar from './Sidebar';
import HeaderAdmin from './HeaderAdmin';
import StatsOverview from './StatsOverview';
import ReservationList from './ReservationList';
import Notifications from './Notifications';
import './Dashboard.css';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [notifications, setNotifications] = useState([]); 

  useEffect(() => {
    const socket = io('http://localhost:8000'); 

    socket.on('new_notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      socket.disconnect(); 
    };
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reservations');
        setReservations(response.data); 
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []); 

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <HeaderAdmin user="Mr Diagne" />
        <StatsOverview />
        <h2>Liste des réservations de l'Hotel Novotel</h2>
        <ReservationList reservations={reservations} /> 
        <Notifications notifications={notifications} /> 
      </div>
    </div>
  );
};

export default Dashboard;
