import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import BusCard from '../components/BusCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchBuses = async (searchFrom = '', searchTo = '') => {
        try {
            setLoading(true);
            const params = {};
            if (searchFrom) params.from = searchFrom;
            if (searchTo) params.to = searchTo;

            const response = await axios.get('http://localhost:5000/api/buses', { params });
            setFilteredBuses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching buses:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    const handleSearch = () => {
        fetchBuses(from, to);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[500px]"
                style={{ backgroundImage: 'url("https://placehold.co/1200x600?text=Gumla+Bus+Stand")' }} // Using a larger placeholder
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Track Your Gumla Bus</h1>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl">Find the best buses for your journey. Reliable, fast, and always on time.</p>

                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-3xl flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">From</label>
                            <input
                                type="text"
                                placeholder="Enter Source (e.g. Gumla)"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-gray-800"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">To</label>
                            <input
                                type="text"
                                placeholder="Enter Destination (e.g. Ranchi)"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-gray-800"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleSearch}
                                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded transition-colors flex items-center justify-center gap-2"
                            >
                                <Search size={20} />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bus Results */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Buses</h2>
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Loading buses...</p>
                    </div>
                ) : filteredBuses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBuses.map((bus) => (
                            <BusCard key={bus.id} bus={bus} onClick={() => navigate(`/bus/${bus.id}`)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No buses found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
