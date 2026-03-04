import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Home, Info, Phone, Shield, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/gumla-gadi-logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Close sidebar on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="bg-secondary-500 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center group">
                                <img src={logo} alt="Gumla Gadi" className="h-24 w-auto object-contain" />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link to="/" className="text-gray-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                Home
                            </Link>
                            <Link to="/about" className="text-gray-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                Contact
                            </Link>

                            {user ? (
                                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="bg-accent-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-accent-400 transition-all uppercase tracking-wide shadow-sm">
                                            Admin
                                        </Link>
                                    )}
                                    <Link to="/dashboard" className="flex items-center gap-2 text-gray-200 text-sm font-medium hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all">
                                        <div className="w-8 h-8 bg-primary-500/30 rounded-full flex items-center justify-center">
                                            <User size={16} className="text-primary-300" />
                                        </div>
                                        <span className="hidden lg:block">{user.name?.split(' ')[0]}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
                                    >
                                        <LogOut size={16} />
                                        <span className="hidden lg:block">Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
                                    <Link to="/login" className="text-gray-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="bg-primary-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-400 transition-all shadow-sm hover:shadow-md">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-white hover:text-primary-300 p-2 rounded-lg hover:bg-white/10 transition-all"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 z-50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-secondary-500 z-50 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Sidebar Header - matches navbar h-16 */}
                <div className="bg-secondary-500 h-16 px-4 flex items-center justify-between border-b border-primary-300/30">
                    <div className="flex items-center">
                        <img src={logo} alt="Gumla Gadi" className="h-20 w-auto object-contain" />
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-primary-400/20 transition-all"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="py-4 px-3 flex-1 overflow-y-auto">
                    {/* User Info Section */}
                    {user && (
                        <div className="mx-1 mb-4 p-3 bg-primary-400/10 rounded-lg border border-primary-300/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-400/20 rounded-full flex items-center justify-center border border-primary-300/30">
                                    <User size={20} className="text-primary-300" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">{user.name}</p>
                                    <p className="text-xs text-primary-200/70 truncate max-w-[150px]">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <p className="px-4 mb-2 text-xs font-semibold text-primary-300/60 uppercase tracking-wider">Menu</p>
                    <div className="space-y-1">
                        <Link 
                            to="/" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/') ? 'bg-primary-500 text-white' : 'text-gray-200 hover:bg-primary-400/15 hover:text-white'}`}
                        >
                            <Home size={20} className={isActive('/') ? 'text-white' : 'text-primary-300/60'} />
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/about') ? 'bg-primary-500 text-white' : 'text-gray-200 hover:bg-primary-400/15 hover:text-white'}`}
                        >
                            <Info size={20} className={isActive('/about') ? 'text-white' : 'text-primary-300/60'} />
                            About Us
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/contact') ? 'bg-primary-500 text-white' : 'text-gray-200 hover:bg-primary-400/15 hover:text-white'}`}
                        >
                            <Phone size={20} className={isActive('/contact') ? 'text-white' : 'text-primary-300/60'} />
                            Contact
                        </Link>
                    </div>

                    {user && (
                        <>
                            <div className="my-4 mx-4 border-t border-primary-300/20"></div>
                            <p className="px-4 mb-2 text-xs font-semibold text-primary-300/60 uppercase tracking-wider">Account</p>
                            <div className="space-y-1">
                                <Link 
                                    to="/dashboard" 
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/dashboard') ? 'bg-primary-500 text-white' : 'text-gray-200 hover:bg-primary-400/15 hover:text-white'}`}
                                >
                                    <LayoutDashboard size={20} className={isActive('/dashboard') ? 'text-white' : 'text-primary-300/60'} />
                                    Dashboard
                                </Link>
                                {user.role === 'admin' && (
                                    <Link 
                                        to="/admin" 
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/admin') ? 'bg-accent-400 text-white' : 'text-gray-200 hover:bg-accent-400/15 hover:text-white'}`}
                                    >
                                        <Shield size={20} className={isActive('/admin') ? 'text-white' : 'text-accent-300'} />
                                        Admin Panel
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-300/20 bg-secondary-600">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-400 transition-all"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    ) : (
                        <div className="space-y-2">
                            <Link 
                                to="/login" 
                                className="block w-full text-center font-semibold py-3 px-4 rounded-lg border border-primary-400 text-primary-300 hover:bg-primary-400/15 transition-all"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="block w-full text-center font-semibold py-3 px-4 rounded-lg bg-primary-500 text-white hover:bg-primary-400 transition-all"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
