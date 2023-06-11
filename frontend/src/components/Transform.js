import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const TransForm = () => {
  const [orderId, setOrderId] = useState('');
  const [price, setPrice] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext); 
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    console.log(user.id.toString());
    const idd=user.id.toString()
    try {
      const response = await axios.post('http://localhost:4000/api/messages/transporter', {  transporter: idd , 
      });
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    console.log(price);
    e.preventDefault();

    try {
      const selectedMessage = messages.find((message) => message.orderId === orderId);

      if (selectedMessage) {
        await axios.post('http://localhost:4000/api/messages/price', {
          orderId: selectedMessage.orderId,
          price,
        });
        console.log('Reply message sent successfully');

        setOrderId('');
        setPrice('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Transporter Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID:</label>
          <select value={orderId} onChange={(e) => setOrderId(e.target.value)}>
            <option value="">Select Order ID</option>
            {messages.map((message) => (
              <option key={message._id} value={message.orderId}>
                {message.orderId}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

export default TransForm;
