import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Manuform = () => {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transporter, setTransporter] = useState('');
  const [transporters, setTransporters] = useState([]);
  const [messages, setMessages] = useState([]);

  const authContext = useContext(AuthContext);
  const manufacturerId = authContext.user.id;
  const address = authContext.user.address;

  useEffect(() => {
    fetchTransporters();
    fetchManufacturerMessages();
  }, []);

  const fetchTransporters = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/transporters');
      setTransporters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchManufacturerMessages = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/messages/manufacturer', {
        manufacturer: manufacturerId,
      });
      const messagesWithReplies = await Promise.all(
        response.data.map(async (message) => {
          const repliesResponse = await axios.post('http://localhost:4000/api/messages/order', {
            orderId: message.orderId,
          });
          return { ...message, replies: repliesResponse.data };
        })
      );
      setMessages(messagesWithReplies);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRepliesByOrderId = async (orderId) => {
    console.log(orderId);
    try {
      const response = await axios.post('http://localhost:4000/api/messages/order', {
        orderId,
      });
      console.log(response.data);
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.orderId === orderId ? { ...message, replies: response.data } : message
        )
      );
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/messages/', {
        orderId: generateOrderId(),
        to,
        from,
        quantity,
        address,
        transporter,
        manufacturerId,
      });
      console.log('Message sent successfully');

      // Clear the form fields
      setTo('');
      setFrom('');
      setQuantity('');
      setTransporter('');
    } catch (error) {
      console.error(error);
    }
  };

  const generateOrderId = () => {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';

    for (let i = 0; i < 4; i++) {
      orderId += alphanumericChars.charAt(Math.floor(Math.random() * alphanumericChars.length));
    }

    return orderId;
  };

  return (
    <div>
      <h2>Manufacturer Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div>
          <label>From:</label>
          <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label>Quantity:</label>
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            <option value="">Select Quantity</option>
            <option value="1">1 ton</option>
            <option value="2">2 tons</option>
            <option value="3">3 tons</option>
          </select>
        </div>
        <div>
          <label>Transporter:</label>
          <select
            value={transporter}
            onChange={(e) => setTransporter(e.target.value)}
          >
            <option value="">Select Transporter</option>
            {transporters.map((transporter) => (
              <option key={transporter._id} value={transporter._id}>
                {transporter.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Send Message</button>
      </form>
      <h3>Messages</h3>
      {messages.map((message) => (
        <div key={message._id}>
          <p>Order ID: {message.orderId}</p>
          <p>To: {message.to}</p>
          <p>From: {message.from}</p>
          {/* Display other message details as needed */}
          <h4>Replies:</h4>
          {message.replies && message.replies.length > 0 ? (
            message.replies.map((reply) => (
              <div key={reply._id}>
                {/* Display reply details */}
                <p>{reply.price}</p>
              </div>
            ))
          ) : (
            <p>No replies yet</p>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Manuform;
