import React, { useEffect, useState } from 'react';
import UserChart from '../component/UserChart';
import { saveAs } from 'file-saver';
import {Helmet} from "react-helmet";

const Dashboard = () => {
  const [users, setUsers] = useState([]); // State to hold users data
  const [hotelBookings, setHotelBookings] = useState(0); // State for total hotel bookings
  const [flightBookings, setFlightBookings] = useState(0); // State for total flight bookings

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api-v2-qsrn.onrender.com/api/user/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        const formattedUsers = data.map(user => ({
          id: user._id,
          username: user.username,
          createdAt: user.createdAt // Changed to createdAt
        }));

        setUsers(formattedUsers); // Store the fetched users in state
      } catch (error) {
     
      }
    };

    const fetchHotelBookings = async () => {
      try {
        const response = await fetch('https://api-v2-qsrn.onrender.com/api/hotelbook/allbookings'); // Adjust the endpoint accordingly
        if (!response.ok) {
          throw new Error('Failed to fetch hotel bookings');
        }
        const data = await response.json();
        setHotelBookings(data.length); // Assuming the response is an array
      } catch (error) {
        
      }
    };

    const fetchFlightBookings = async () => {
      try {
        const response = await fetch('https://api-v2-qsrn.onrender.com/api/flightbook/getall'); // Adjust the endpoint accordingly
        if (!response.ok) {
          throw new Error('Failed to fetch flight bookings');
        }
        const data = await response.json();
        setFlightBookings(data.length); // Assuming the response is an array
      } catch (error) {
     
      }
    };

    fetchUsers();
    fetchHotelBookings();
    fetchFlightBookings();
  }, []); // Empty dependency array means this effect runs once on mount

  // Prepare data for the UserChart
  const userChartData = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'
    acc[date] = (acc[date] || 0) + 1; // Increment count for the date
    return acc;
  }, {});

  // Convert object to array of { date, count }
  const chartData = Object.keys(userChartData).map(date => ({
    date,
    count: userChartData[date]
  }));

  const handleDownload = () => {
    const csvHeader = 'ID,Username,Registration Date\n';
    const csvRows = users.map(user => `${user.id},${user.username},${user.createdAt}`).join('\n');
    const csv = csvHeader + csvRows;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'user_data.csv');
  };

  return (
    <section className="dashboard-content">
         <Helmet>
             
             <title>Dashboard</title>
           
         </Helmet>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: '10px' }} className="stats-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="card">
          <h3>Total Hotel Bookings</h3>
          <p>{hotelBookings}</p>
        </div>
        <div className="card">
          <h3>Total Flight Bookings</h3>
          <p>{flightBookings}</p>
        </div>
      </div>

      <button onClick={handleDownload}>Download CSV</button>

      <UserChart data={chartData} />
    </section>
  );
};

export default Dashboard;
