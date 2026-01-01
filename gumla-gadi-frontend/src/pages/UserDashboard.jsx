import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Mail, Phone, Shield } from 'lucide-react';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return <div className="p-10 text-center">Loading User Data...</div>; // Should ideally redirect if protected route fails
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-indigo-600 px-6 py-8 md:px-10 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Hello, {user.name}</h1>
                            <p className="text-indigo-100 mt-1">Welcome to your dashboard</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                            <User className="h-10 w-10 text-white" />
                        </div>
                    </div>

                    <div className="px-6 py-8 md:px-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Profile Details</h2>

                        <div className="space-y-6">
                            <div className="flex items-center">
                                <Mail className="h-6 w-6 text-gray-400 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="text-lg font-medium text-gray-900">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Phone className="h-6 w-6 text-gray-400 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="text-lg font-medium text-gray-900">{user.phone || 'Not Provided'}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Shield className="h-6 w-6 text-gray-400 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">Account Role</p>
                                    <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t pt-8">
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full justify-center md:w-auto"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
