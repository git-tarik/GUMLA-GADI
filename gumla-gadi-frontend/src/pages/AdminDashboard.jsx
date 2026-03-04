import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Bus, Shield, MapPin, Clock } from 'lucide-react';
import config from '../config';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        source: '',
        destination: '',
        price: '',
        departureTime: '',
        arrivalTime: '',
        contact: '',
        stand: 'Gumla Depot',
        type: 'Non-AC'
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        } else {
            fetchBuses();
        }
    }, [user, navigate]);

    const fetchBuses = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/buses`);
            setBuses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching buses:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post(`${config.API_BASE_URL}/api/buses`, {
                ...formData,
                id: Math.floor(Math.random() * 100000)
            }, configHeaders);

            setMessage({ type: 'success', text: 'Bus Added Successfully' });
            setFormData({
                name: '',
                source: '',
                destination: '',
                price: '',
                departureTime: '',
                arrivalTime: '',
                contact: '',
                stand: 'Gumla Depot',
                type: 'Non-AC'
            });
            fetchBuses();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Error adding bus' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this bus?')) {
            try {
                const configHeaders = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`${config.API_BASE_URL}/api/buses/${id}`, configHeaders);
                fetchBuses();
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting bus');
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary-500"></div>
                </div>
                <p className="text-gray-500 font-medium">Loading Admin Panel...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-8 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <Shield className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                            <p className="text-white/80 text-sm">Manage buses and routes</p>
                        </div>
                    </div>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                        Admin Access
                    </span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Bus Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sticky top-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary-50 p-2 rounded-xl">
                                <Plus className="h-5 w-5 text-primary-500" />
                            </div>
                            <h2 className="text-lg font-bold text-secondary-500">Add New Bus</h2>
                        </div>

                        {message.text && (
                            <div className={`p-4 mb-6 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="input-label">Bus Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" placeholder="Enter bus name" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="input-label">Source</label>
                                    <input type="text" name="source" value={formData.source} onChange={handleChange} required className="input-field" placeholder="From" />
                                </div>
                                <div>
                                    <label className="input-label">Destination</label>
                                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} required className="input-field" placeholder="To" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="input-label">Departure</label>
                                    <input type="text" name="departureTime" value={formData.departureTime} onChange={handleChange} required placeholder="10:00 AM" className="input-field" />
                                </div>
                                <div>
                                    <label className="input-label">Arrival</label>
                                    <input type="text" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required placeholder="05:00 PM" className="input-field" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="input-label">Price (₹)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="input-field" placeholder="0" />
                                </div>
                                <div>
                                    <label className="input-label">Contact</label>
                                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} required className="input-field" placeholder="Phone" />
                                </div>
                            </div>

                            <div>
                                <label className="input-label">Bus Stand</label>
                                <select name="stand" value={formData.stand} onChange={handleChange} className="input-field">
                                    <option value="Gumla Depot">Gumla Depot</option>
                                    <option value="Dunduriya">Dunduriya</option>
                                </select>
                            </div>

                            <div>
                                <label className="input-label mb-3">Bus Type</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="type" value="AC" checked={formData.type === 'AC'} onChange={handleChange} className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500" />
                                        <span className="text-sm text-gray-700 font-medium">AC</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="type" value="Non-AC" checked={formData.type === 'Non-AC'} onChange={handleChange} className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500" />
                                        <span className="text-sm text-gray-700 font-medium">Non-AC</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                <Plus size={18} />
                                Add Bus
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bus List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-secondary-500 p-2 rounded-xl">
                                    <Bus className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-lg font-bold text-secondary-500">Manage Buses</h2>
                            </div>
                            <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-bold">
                                {buses.length} Total
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Bus Details</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Route</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Info</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {buses.map((bus) => (
                                        <tr key={bus.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-secondary-500">{bus.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">{bus.type}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1 text-sm text-gray-700">
                                                    {bus.source} <span className="text-gray-400">→</span> {bus.destination}
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <MapPin size={12} className={bus.stand === 'Gumla Depot' ? 'text-primary-500' : 'text-accent-500'} />
                                                    <span className="text-xs text-gray-500">{bus.stand}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-green-600">₹{bus.price}</div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <Clock size={12} />
                                                    {bus.departureTime}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button
                                                    onClick={() => handleDelete(bus.id)}
                                                    className="text-red-500 hover:text-red-600 bg-red-50 p-2.5 rounded-xl hover:bg-red-100 transition-all"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {buses.length === 0 && (
                                <div className="text-center py-12">
                                    <Bus size={40} className="text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No buses added yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
