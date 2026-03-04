import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, BusFront, LogOut, User, Home, Info, Phone, Shield, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
                            <Link to="/" className="flex items-center space-x-2 group">
                                <div className="bg-primary-500 p-2 rounded-lg group-hover:bg-primary-400 transition-colors">
                                    <BusFront className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white leading-tight">Gumla Gadi</span>
                                    <span className="text-[10px] text-primary-300 uppercase tracking-wider font-medium">Bus Tracking</span>
                                </div>
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
            <div className={`fixed top-0 left-0 h-full w-72 bg-secondary-500 z-50 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Sidebar Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <BusFront className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Gumla Gadi</h2>
                                <p className="text-xs text-white/70">Bus Tracking</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all"
                        >
                            <X size={22} />
                        </button>
                    </div>
                    
                    {/* User Info in Sidebar Header */}
                    {user && (
                        <div className="mt-5 pt-5 border-t border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">
                                    <User size={22} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{user.name}</p>
                                    <p className="text-xs text-white/70 truncate max-w-[150px]">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Navigation */}
                <div className="py-4 px-3 flex-1 overflow-y-auto">
                    <div className="space-y-1">
                        <Link 
                            to="/" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/') ? 'bg-primary-500/20 text-primary-300' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Home size={20} className={isActive('/') ? 'text-primary-400' : 'text-gray-500'} />
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/about') ? 'bg-primary-500/20 text-primary-300' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Info size={20} className={isActive('/about') ? 'text-primary-400' : 'text-gray-500'} />
                            About Us
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/contact') ? 'bg-primary-500/20 text-primary-300' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Phone size={20} className={isActive('/contact') ? 'text-primary-400' : 'text-gray-500'} />
                            Contact
                        </Link>
                    </div>

                    {user && (
                        <>
                            <div className="my-4 border-t border-white/10"></div>
                            <div className="space-y-1">
                                <Link 
                                    to="/dashboard" 
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/dashboard') ? 'bg-primary-500/20 text-primary-300' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                                >
                                    <LayoutDashboard size={20} className={isActive('/dashboard') ? 'text-primary-400' : 'text-gray-500'} />
                                    Dashboard
                                </Link>
                                {user.role === 'admin' && (
                                    <Link 
                                        to="/admin" 
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/admin') ? 'bg-primary-500/20 text-primary-300' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        <Shield size={20} className={isActive('/admin') ? 'text-primary-400' : 'text-gray-500'} />
                                        Admin Panel
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-secondary-700">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary-600 transition-all"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    ) : (
                        <div className="space-y-2">
                            <Link 
                                to="/login" 
                                className="block w-full text-center font-semibold py-3 px-4 rounded-xl border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-all"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="block w-full text-center font-semibold py-3 px-4 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-all"
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
