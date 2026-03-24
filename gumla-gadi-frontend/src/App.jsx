import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BusDetails from './pages/BusDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import HamsafarChat from './components/HamsafarChat';
import Footer from './components/Footer';
import { ModalProvider } from './context/ModalContext';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

function App() {
  return (
    <ModalProvider>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bus/:id" element={<BusDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <HamsafarChat />
        <Footer />
        
        {/* Modal Components */}
        <LoginModal />
        <SignupModal />
      </div>
    </ModalProvider>
  );
}

export default App;
