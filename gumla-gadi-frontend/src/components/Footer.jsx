import React from 'react';
import { Link } from 'react-router-dom';
import { BusFront, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    {/* Brand */}
                    <div className="mb-6 md:mb-0 flex items-center space-x-2">
                        <BusFront className="h-8 w-8 text-orange-500" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                            Gumla Gadi
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex space-x-8">
                        <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</Link>
                        <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors">About</Link>
                        <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</Link>
                        <Link to="/admin" className="text-gray-400 hover:text-orange-500 transition-colors">Admin Panel</Link>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Gumla Gadi. All rights reserved.</p>
                    <p className="flex items-center mt-2 md:mt-0">
                        Built with <Heart className="h-4 w-4 text-red-500 mx-1 fill-current" /> in Jharkhand
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
