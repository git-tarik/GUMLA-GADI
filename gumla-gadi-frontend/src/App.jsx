import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BusDetails from './pages/BusDetails';
import Login from './pages/Login';

function App() {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bus/:id" element={<BusDetails />} />
        <Route path="/login" element={<Login />} />
        {/* Placeholders for links in Navbar */}
        <Route path="/about" element={<div className="p-20 text-center">About Page (Coming Soon)</div>} />
        <Route path="/contact" element={<div className="p-20 text-center">Contact Page (Coming Soon)</div>} />
      </Routes>
    </div>
  );
}

export default App;
