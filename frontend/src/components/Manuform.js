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

      setTo('');
      setFrom('');
      setQuantity('');
      setTransporter('');
      fetchManufacturerMessages()
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
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
    <div className="bg-gray-700 w-4/5 p-8 rounded-lg text-white flex">
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-4">Manufacturer Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">To:</label>
            <input
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">From:</label>
            <input
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Quantity:</label>
            <select
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              <option value="">Select Quantity</option>
              <option value="1">1 ton</option>
              <option value="2">2 tons</option>
              <option value="3">3 tons</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Transporter:</label>
            <select
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Send Message
          </button>
        </form>
        </div>
        <div className="mt-8 w-1/2">
          <h3 className="text-lg font-bold mb-4">Messages</h3>
          {messages.map((message) => (
            <div key={message._id} className="bg-gray-600 rounded-lg p-4 mb-4">
              <p className="text-white font-bold mb-2">Order ID: {message.orderId}</p>
              <p className="text-white mb-2">To: {message.to}</p>
              <p className="text-white mb-2">From: {message.from}</p>
              <h4 className="text-white font-bold mb-2">Replies:</h4>
              {message.replies && message.replies.length > 0 ? (
                message.replies.map((reply) => (
                  <div key={reply._id} className="bg-gray-500 rounded-lg p-2 mb-2">
                    <p className="text-white">{reply.price}</p>
                  </div>
                ))
              ) : (
                <p className="text-white">No replies yet</p>
              )}
            </div>
          ))}
         </div>
      
    </div>
  </div>
  );
};

export default Manuform;
