import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        username,
        password,
        role,
        address,
      });
      console.log(response.data); 
      login(response.data.user);
      setUsername('');
      setPassword('');
      setRole('');
      setAddress('');
      setError('');
    } catch (error) {
      setError('Failed to register user');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="bg-gray-700 w-full max-w-md p-8 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Username:</label>
            <input
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Password:</label>
            <input
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Role:</label>
            <select
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Transporter">Transporter</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Address:</label>
            <input
              className="bg-blue-200 border border-gray-400 p-2 w-full text-gray-800 rounded"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
