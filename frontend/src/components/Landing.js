import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/messages');
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const results = messages.filter((message) =>
      message.orderId.includes(searchTerm) ||
      message.to.includes(searchTerm) ||
      message.from.includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handleMessageClick = (message) => {
    // Handle clicking on a message, e.g., display its content
    console.log('Clicked message:', message);
  };

  return (
    <div>
      <h2>Landing Page</h2>
      <div>
        <input
          type="text"
          placeholder="Search by Order ID, To, or From"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((message) => (
              <li key={message._id} onClick={() => handleMessageClick(message)}>
                Order ID: {message.orderId} | To: {message.to} | From: {message.from}
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
