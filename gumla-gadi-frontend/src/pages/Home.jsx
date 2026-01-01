import React, { useState, useEffect } from 'react';
import { Search, Clock, MapPin, Bot, ArrowRight } from 'lucide-react';
import BusCard from '../components/BusCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchBuses = async (searchFrom = '', searchTo = '') => {
        try {
            setLoading(true);
            setError('');
            const params = {};
            if (searchFrom) params.from = searchFrom;
            if (searchTo) params.to = searchTo;

            const response = await axios.get('http://localhost:5000/api/buses', { params });
            setFilteredBuses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching buses:', error);
            setError('Failed to fetch buses. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    const handleSearch = () => {
        fetchBuses(from, to);
    };

    const handleQuickSearch = (source, destination) => {
        setFrom(source);
        setTo(destination);
        fetchBuses(source, destination);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-orange-500 to-blue-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Safar Asaan, <br className="hidden md:block" />
                        <span className="text-orange-300">Gumla Ki Pehchaan</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl font-light">
                        Track real-time bus schedules from Gumla Depot and Dunduriya Stand. Your reliable travel companion is here.
                    </p>

                    {/* Search Bar - Floating Card */}
                    <div className="bg-white p-2 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row gap-2">
                        <div className="flex-1 relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <div className="bg-orange-100 p-1.5 rounded-full text-orange-600">
                                    <MapPin size={16} />
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="From (e.g. Gumla)"
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium text-gray-700 outline-none"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
                                    <MapPin size={16} />
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="To (e.g. Ranchi)"
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700 outline-none"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            Search Buses
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Accurate Timings</h3>
                            <p className="text-gray-600">Real-time departure and arrival schedules so you never miss your ride.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Dual Stand Info</h3>
                            <p className="text-gray-600">Know exactly whether your bus leaves from Gumla Depot or Dunduriya Stand.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                                <Bot size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Assistant</h3>
                            <p className="text-gray-600">Chat with HamsafarAI for instant travel advice and route planning.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Routes Section */}
            <div className="py-12 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <ArrowRight className="text-orange-500" /> Popular Routes
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button onClick={() => handleQuickSearch('Gumla', 'Ranchi')} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-left group">
                            <div className="text-sm text-gray-500 mb-1">Route</div>
                            <div className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">Gumla → Ranchi</div>
                        </button>
                        <button onClick={() => handleQuickSearch('Gumla', 'Lohardaga')} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-left group">
                            <div className="text-sm text-gray-500 mb-1">Route</div>
                            <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Gumla → Lohardaga</div>
                        </button>
                        <button onClick={() => handleQuickSearch('Gumla', 'Simdega')} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-left group">
                            <div className="text-sm text-gray-500 mb-1">Route</div>
                            <div className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Gumla → Simdega</div>
                        </button>
                        <button onClick={() => handleQuickSearch('Gumla', 'Jashpur(chhattisgarh)')} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-left group">
                            <div className="text-sm text-gray-500 mb-1">Route</div>
                            <div className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Gumla → Jashpur(chhattisgarh)</div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bus Results (Existing Logic) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Available Buses</h2>
                    {filteredBuses.length > 0 && (
                        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                            {filteredBuses.length} Buses Found
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-500 text-lg">Loading reliable rides for you...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl relative text-center" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : filteredBuses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBuses.map((bus) => (
                            <BusCard key={bus.id} bus={bus} onClick={() => navigate(`/bus/${bus.id}`)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-4">🚌</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No buses found</h3>
                        <p className="text-gray-500">Try changing your source or destination search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
