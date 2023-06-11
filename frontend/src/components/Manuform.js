import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManufacturerForm = () => {
  const [orderId, setOrderId] = useState('');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [transporter, setTransporter] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/messages', {
        orderId,
        to,
        from,
        quantity,
        address,
        transporter,
      });
      console.log('Message sent successfully');

      // Clear the form fields
      setOrderId('');
      setTo('');
      setFrom('');
      setQuantity('');
      setAddress('');
      setTransporter('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Manufacturer Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID:</label>
          <select value={orderId} onChange={(e) => setOrderId(e.target.value)}>
            <option value="">Select Order ID</option>
            {orders.map((order) => (
              <option key={order._id} value={order.orderId}>
                {order.orderId}
              </option>
            ))}
          </select>
        </div>
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
            <option value="2">2 ton</option>
            <option value="3">3 ton</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Transporter:</label>
          <select
            value={transporter}
            onChange={(e) => setTransporter(e.target.value)}
          >
            <option value="">Select Transporter</option>
            <option value="Transporter 1">Transporter 1</option>
            <option value="Transporter 2">Transporter 2</option>
            <option value="Transporter 3">Transporter 3</option>
          </select>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ManufacturerForm;
