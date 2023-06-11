import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });
      console.log(response.data); 
      login(response.data.user);
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      setError('Invalid credentials');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="bg-gray-700 w-full max-w-md p-8 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
