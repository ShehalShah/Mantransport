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
    const idd = user.id.toString();
    try {
      const response = await axios.post('http://localhost:4000/api/messages/transporter', {
        transporter: idd,
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
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="bg-gray-700 w-4/5 p-8 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Transporter Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Order ID:</label>
            <select
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            >
              <option value="">Select Order ID</option>
              {messages.map((message) => (
                <option key={message._id} value={message.orderId}>
                  {message.orderId}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Price:</label>
            <input
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Reply
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransForm;
