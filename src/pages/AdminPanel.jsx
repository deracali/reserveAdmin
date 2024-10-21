import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import '../styles/AdminPanel.css'; // Import the CSS for styles
import Logo from '../assets/logo.png'

const AdminPanel = () => {
  return (
    <div className="admin-container">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
         <img src={Logo}/>
        </div>
        <ul className="nav-list">
          <li><Link to="dashboard">Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/flight-bookings">Flight Bookings</Link></li>
          <li><Link to="/hotel-bookings">Hotel Bookings</Link></li>
          <li><Link to="/agency-form">Agency-Form</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* This is where the content will render based on the clicked link */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
