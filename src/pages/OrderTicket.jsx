import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";


const Orders = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [limit, setLimit] = useState(10); // Limit for displayed bookings
  const [searchUserId, setSearchUserId] = useState(''); // State for searching user IDs

  // Function to fetch all flight bookings from the backend
  const fetchAllFlightBookings = async () => {
    try {
      const response = await axios.get('https://api-v2-qsrn.onrender.com/api/flightbook/getall'); // Endpoint to fetch all bookings
      setFlightBookings(response.data); // Set the fetched bookings in state
    } catch (error) {
    
    }
  };

  // Fetch all flight bookings when the component mounts
  useEffect(() => {
    fetchAllFlightBookings();
  }, []);

  // Function to handle downloading the CSV
  const handleDownloadCSV = () => {
    const headers = ['Booking ID', 'Flight Number', 'Customer', 'Origin', 'Destination', 'Departure Time', 'Status'];
    const rows = flightBookings.map(booking => [
      booking._id,
      booking.flightId, // Adjust according to your data structure
      booking.userId, // Make sure your booking has this field
      booking.origin, // Adjust according to your data structure
      booking.destination, // Adjust according to your data structure
      booking.departureTime, // Adjust according to your data structure
      booking.status // Adjust according to your data structure
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n'; // Add header row
    rows.forEach(row => {
      csvContent += row.join(',') + '\n'; // Add each row
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'flight_bookings.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up after download
  };

  // Handle Load More button click
  const loadMoreBookings = () => {
    setLimit(prevLimit => prevLimit + 10); // Increase limit by 10
  };

  // Filter bookings based on the search input
  const filteredBookings = flightBookings.filter(booking =>
    booking.userId.toLowerCase().includes(searchUserId.toLowerCase())
  );

  return (
    <div className="bookings-container">
         <Helmet>
             
             <title>Orders-Ticket</title>
           
         </Helmet>
    <header className="bookings-header">
      <h1>Flight Bookings List</h1>
  
      {/* Search Input */}
      <div className="search-box">
        <label htmlFor="searchUserId">Search by User ID:</label>
        <input
          type="text"
          id="searchUserId"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          placeholder="Enter User ID"
        />
      </div>
    </header>
  
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Flight Number</th>
            <th>Customer</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Departure Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.slice(0, limit).map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.flightId}</td>
              <td>{booking.userId}</td>
              <td>{booking.origin}</td>
              <td>{booking.destination}</td>
              <td>{booking.status}</td>
              <td>{booking.departureTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {/* Load More Button */}
    {filteredBookings.length > limit && (
      <button className="load-more-btn" onClick={loadMoreBookings}>Load More</button>
    )}
  
    {/* Download Button */}
    <button className="download-btn" onClick={handleDownloadCSV}>Download CSV</button>
  </div>
  
  );
};

export default Orders;
