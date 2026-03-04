import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Mail, Phone, Shield, Bus, ArrowRight, Clock, MapPin } from 'lucide-react';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary-500"></div>
                    </div>
                    <p className="text-gray-500 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                            <User className="h-10 w-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome, {user.name}</h1>
                            <p className="text-white/70 mt-1">Manage your account and explore buses</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8">
                    {/* Quick Stats */}
                    <Link to="/" className="bg-white rounded-2xl shadow-card p-6 border border-gray-100 hover:shadow-card-hover transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-primary-50 p-3 rounded-xl">
                                <Bus className="h-6 w-6 text-primary-500" />
                            </div>
                            <ArrowRight size={18} className="text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Browse</h3>
                        <p className="text-lg font-bold text-secondary-500">Search Buses</p>
                    </Link>

                    <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-accent-50 p-3 rounded-xl">
                                <MapPin className="h-6 w-6 text-accent-500" />
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Stands</h3>
                        <p className="text-lg font-bold text-secondary-500">2 Available</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-50 p-3 rounded-xl">
                                <Clock className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Support</h3>
                        <p className="text-lg font-bold text-secondary-500">24/7 AI Help</p>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 mt-8 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
                        <div className="bg-secondary-500 p-2 rounded-xl">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-secondary-500">Profile Details</h2>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Email Address</p>
                                <p className="text-base font-medium text-gray-800 mt-0.5">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Phone Number</p>
                                <p className="text-base font-medium text-gray-800 mt-0.5">{user.phone || 'Not Provided'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <Shield className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Account Role</p>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mt-1 ${user.role === 'admin' ? 'bg-primary-50 text-primary-600' : 'bg-green-50 text-green-600'}`}>
                                    {user.role === 'admin' ? 'Administrator' : 'User'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl text-white bg-primary-500 hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
