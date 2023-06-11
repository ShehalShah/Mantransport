import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './components/Navigation';
import Login from './components/Login';
import Registration from './components/Registration';
import Landing from './components/Landing';
import Manuform from './components/Manuform';
import Transform from './components/Transform';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
    <Router>
        <Navigation />
        <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/manufacturer" element={<Manuform />} />
        <Route exact path="/transporter" element={<Transform />} />
        </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
