import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Orders from './pages/OrderTicket';
import VisaRequirementForm from './pages/VisaRequirementForm';
import OrdersHotels from './pages/OrderHotel';


function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all the content pages inside the AdminPanel layout */}
        <Route path="/" element={<AdminPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="flight-bookings" element={<Orders />} />
          <Route path="hotel-bookings" element={<OrdersHotels />} />
          <Route path="/agency-form" element={<VisaRequirementForm />} />
         
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
