import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BusFront, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <BusFront className="h-8 w-8 text-indigo-600" />
                            <span className="text-2xl font-bold text-indigo-600">Gumla Gadi</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                        <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>

                        {user ? (
                            <div className="flex items-center space-x-4 ml-4">
                                <span className="flex items-center text-gray-700 text-sm font-medium">
                                    <User size={16} className="mr-1 text-indigo-600" />
                                    {user.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                                >
                                    <LogOut size={16} className="mr-1" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">Login</Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">About</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">Contact</Link>

                        {user ? (
                            <>
                                <div className="px-3 py-2 text-indigo-600 font-bold border-t border-gray-100 mt-2">
                                    Hello, {user.name}
                                </div>
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="block w-full text-left text-red-600 font-bold hover:bg-gray-50 px-3 py-2 rounded-md text-base"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-left text-indigo-600 font-bold hover:bg-gray-50 px-3 py-2 rounded-md text-base">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
