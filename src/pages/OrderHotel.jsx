import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";

const OrdersHotels = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [limit, setLimit] = useState(10); // Limit for displayed bookings
  const [searchUserId, setSearchUserId] = useState(''); // State for searching user IDs

  // Function to fetch all hotel bookings from the backend
  const fetchAllHotelBookings = async () => {
    try {
      const response = await axios.get('https://api-v2-qsrn.onrender.com/api/bookings'); // Endpoint to fetch all hotel bookings
      setHotelBookings(response.data); // Set the fetched bookings in state
    } catch (error) {
     
    }
  };

  // Fetch all hotel bookings when the component mounts
  useEffect(() => {
    fetchAllHotelBookings();
  }, []);

  // Function to handle downloading the CSV
  const handleDownloadCSV = () => {
    const headers = ['Booking ID', 'Hotel Name', 'Customer', 'Check-in Date', 'Check-out Date', 'Total', 'Status'];
    const rows = hotelBookings.map(booking => [
      booking._id,
      booking.hotel.hotel_name, // Adjust according to your data structure
      booking.userId, // Make sure this field exists
      booking.checkinDate, // Adjust based on your schema
      booking.checkoutDate, // Adjust based on your schema
      booking.totalAmount, // Adjust based on your schema
      booking.status // Adjust based on your schema
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n'; // Add header row
    rows.forEach(row => {
      csvContent += row.join(',') + '\n'; // Add each row
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'hotel_bookings.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up after download
  };

  // Handle Load More button click
  const loadMoreBookings = () => {
    setLimit(prevLimit => prevLimit + 10); // Increase limit by 10
  };

  // Filter bookings based on the search input
  const filteredBookings = hotelBookings.filter(booking =>
    booking.userId.toLowerCase().includes(searchUserId.toLowerCase())
  );

  return (
    <div>
         <Helmet>
             
             <title>Orders-Hotel</title>
           
         </Helmet>
      <h1>Hotel Bookings List</h1>
      
      {/* Search Input */}
      <div>
        <label htmlFor="searchUserId">Search by User ID:</label>
        <input
          type="text"
          id="searchUserId"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          placeholder="Enter User ID"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Hotel Name</th>
            <th>Customer</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.slice(0, limit).map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.hotel.hotel_name}</td>
              <td>{booking.userId}</td>
              <td>{booking.checkinDate}</td>
              <td>{booking.checkoutDate}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Load More Button */}
      {filteredBookings.length > limit && (
        <button onClick={loadMoreBookings}>Load More</button>
      )}

      {/* Download Button */}
      <button onClick={handleDownloadCSV}>Download CSV</button>
    </div>
  );
};

export default OrdersHotels;
