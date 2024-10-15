import React from 'react';
import { FaConciergeBell, FaBed, FaTools, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <h1>AXIL HOTEL</h1>
        <p>*****</p>
      </div>
      <ul style={styles.sidebarList}>
        <li style={styles.sidebarItem}>
          <Link to="/dashboard" style={styles.tb}>
            <FaConciergeBell style={styles.icon} />
            Tableau de Bord
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <FaBed style={styles.icon} />
          <Link to="/reservations" style={styles.link}>
            Réservations
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <FaBed style={styles.icon} />
          <Link to="/rooms" style={styles.link}>Chambres</Link>
        </li>
        <li style={styles.sidebarItem}>
          <FaTools style={styles.icon} />
          <Link to="/services" style={styles.link}>
            Services
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <FaMoneyBillWave style={styles.icon} />
          <Link to="/payments" style={styles.link}>
            Payements
          </Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#f5f0d7',
    height: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  sidebarList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '10px',
    width: '90%',
    borderRadius: '8px',
  },
  icon: {
    marginRight: '10px',
    fontSize: '24px',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  tb: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#884513',
    padding: '10px',
    borderRadius: '20px',
    fontSize: '15px',
  },
};

export default Sidebar;
