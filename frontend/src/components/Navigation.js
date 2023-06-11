import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-gray-800">
      <ul className="flex items-center justify-between px-4 py-2">
        <li>
          <Link
            to="/"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/manufacturer"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            Manufacturer
          </Link>
        </li>
        <li>
          <Link
            to="/transporter"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            Transporter
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
