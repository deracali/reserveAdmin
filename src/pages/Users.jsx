import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";

const Users = () => {
  const [users, setUsers] = useState([]); // State to hold users data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(''); // State for error messages
  const [limit, setLimit] = useState(10); // Limit for displayed users
  const [searchUserId, setSearchUserId] = useState(''); // State for searching user IDs

  // Function to handle downloading the CSV
  const handleDownloadCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role'];
    const rows = users.map(user => [user._id, user.username, user.email, user.role || 'User']); // Use correct keys for your data

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n'; // Add header row
    rows.forEach(row => {
      csvContent += row.join(',') + '\n'; // Add each row
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'users_list.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up after download
  };

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api-v2-qsrn.onrender.com/api/user/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); // Store the fetched users in state
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

  // Handle the Load More button click
  const loadMoreUsers = () => {
    setLimit(prevLimit => prevLimit + 10); // Increase limit by 10
  };

  // Filter users based on the search input
  const filteredUsers = users.filter(user =>
    user._id.toLowerCase().includes(searchUserId.toLowerCase())
  );

  // Render loading, error, or users list
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
<div className="user-list-container">
<Helmet>
             
             <title>Users</title>
           
         </Helmet>
  <main className="content">
    <header className="header">
      <h1>User List</h1>
      <div className="filter-actions">
        <div className="search-box">
          <label htmlFor="searchUserId">Search User ID:</label>
          <input
            type="text"
            id="searchUserId"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            placeholder="Enter User ID"
          />
        </div>
        <button onClick={handleDownloadCSV} className="download-btn">Download CSV</button>
      </div>
    </header>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.slice(0, limit).map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role || 'User'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {filteredUsers.length > limit && (
      <button onClick={loadMoreUsers} className="load-more-btn">Load More</button>
    )}
  </main>
</div>

  );
};

export default Users;
