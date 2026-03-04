import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/gumla-gadi-logo.png';

const Footer = () => {
    return (
        <footer className="bg-secondary-500 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <img src={logo} alt="Gumla Gadi" className="h-12 w-auto object-contain" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Your reliable companion for bus tracking in Gumla. Real-time schedules, accurate information, and hassle-free travel.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin size={14} className="text-primary-400" />
                            <span>Gumla, Jharkhand, India</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-primary-400 text-sm flex items-center gap-2 transition-colors group">
                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-primary-400 text-sm flex items-center gap-2 transition-colors group">
                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-primary-400 text-sm flex items-center gap-2 transition-colors group">
                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Bus Stands */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Bus Stands</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-primary-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-white font-medium">Gumla Main Depot</p>
                                    <p className="text-xs text-gray-500">Long-distance routes</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-accent-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-white font-medium">Dunduriya Stand</p>
                                    <p className="text-xs text-gray-500">Regional connections</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={16} className="text-primary-400" />
                                <span>support@gumlagadi.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone size={16} className="text-primary-400" />
                                <span>+91 XXX XXX XXXX</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} Gumla Gadi. All rights reserved.
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                            Made with <Heart className="h-4 w-4 text-primary-500 mx-1.5 fill-current" /> in Jharkhand
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
