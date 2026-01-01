import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Bus } from 'lucide-react';

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
            const response = await axios.get('http://localhost:5000/api/buses');
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
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/buses', {
                ...formData,
                id: Math.floor(Math.random() * 100000) // Temporary ID generation
            }, config);

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
            fetchBuses(); // Refresh list
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Error adding bus' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this bus?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/buses/${id}`, config);
                fetchBuses();
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting bus');
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Header */}
            <div className="bg-red-800 text-white py-6 px-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Bus className="h-8 w-8" />
                        Admin Dashboard
                    </h1>
                    <span className="bg-red-700 px-3 py-1 rounded-full text-sm">
                        Admin Access Only
                    </span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Bus Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Plus className="h-5 w-5 text-red-600" />
                            Add New Bus
                        </h2>

                        {message.text && (
                            <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bus Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Source</label>
                                    <input type="text" name="source" value={formData.source} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Departure</label>
                                    <input type="text" name="departureTime" value={formData.departureTime} onChange={handleChange} required placeholder="e.g. 10:00 AM" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Arrival</label>
                                    <input type="text" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required placeholder="e.g. 05:00 PM" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stand</label>
                                <select name="stand" value={formData.stand} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border">
                                    <option value="Gumla Depot">Gumla Depot</option>
                                    <option value="Dunduriya">Dunduriya</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type</label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input type="radio" name="type" value="AC" checked={formData.type === 'AC'} onChange={handleChange} className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">AC</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="type" value="Non-AC" checked={formData.type === 'Non-AC'} onChange={handleChange} className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Non-AC</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                                Add Bus
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bus List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800">Manage Buses ({buses.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Details</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Info</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {buses.map((bus) => (
                                        <tr key={bus.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{bus.name}</div>
                                                <div className="text-sm text-gray-500">{bus.type}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{bus.source} → {bus.destination}</div>
                                                <div className="text-xs text-gray-500">{bus.stand}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">₹{bus.price}</div>
                                                <div className="text-xs text-gray-500">{bus.departureTime}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleDelete(bus.id)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
