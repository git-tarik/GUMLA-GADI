import React, { useState, useEffect } from 'react';
import { Search, Clock, MapPin, Bot, ArrowRight, Map, Info } from 'lucide-react';
import BusCard from '../components/BusCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

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

            const response = await axios.get(`${config.API_BASE_URL}/api/buses`, { params });
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
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Dark Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop")' }}
                >
                </div>
                <div className="absolute inset-0 bg-gray-900/60 z-10 backdrop-blur-[2px]"></div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                        Safar Asaan, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Gumla Ki Pehchaan</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                        Real-time tracking for Gumla Depot and Dunduriya Stand. <br /> Your smart, reliable travel companion.
                    </p>

                    {/* Glassmorphism Search Bar */}
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-3 border border-white/20">
                        <div className="flex-1 relative group text-left">
                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-4 uppercase tracking-wider">From</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin size={20} className="text-orange-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Source (e.g. Gumla)"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-semibold text-gray-800 outline-none"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex-1 relative group text-left">
                            <label className="block text-xs font-bold text-gray-500 mb-1 ml-4 uppercase tracking-wider">To</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin size={20} className="text-indigo-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Destination (e.g. Ranchi)"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-semibold text-gray-800 outline-none"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleSearch}
                                className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                <Search size={22} />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Routes Section */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <ArrowRight size={16} className="text-orange-500" /> Popular Routes
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => handleQuickSearch('Gumla', 'Ranchi')} className="px-4 py-2 bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-700 rounded-full text-sm font-medium transition-colors border border-gray-200 hover:border-orange-200">
                            Gumla → Ranchi
                        </button>
                        <button onClick={() => handleQuickSearch('Gumla', 'Lohardaga')} className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium transition-colors border border-gray-200 hover:border-blue-200">
                            Gumla → Lohardaga
                        </button>
                        <button onClick={() => handleQuickSearch('Gumla', 'Simdega')} className="px-4 py-2 bg-gray-100 hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-full text-sm font-medium transition-colors border border-gray-200 hover:border-purple-200">
                            Gumla → Simdega
                        </button>
                        <button onClick={() => handleQuickSearch('Gumla', 'Jashpur(chhattisgarh)')} className="px-4 py-2 bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-full text-sm font-medium transition-colors border border-gray-200 hover:border-green-200">
                            Gumla → Jashpur
                        </button>
                    </div>
                </div>
            </div>

            {/* Bus Stand Guide Section (NEW) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Travel Guide</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">Which Stand Should You Go To?</h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Don't get confused between the two stands. Check your destination below.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card A: Gumla Main Depot */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <MapPin className="fill-current" /> Gumla Main Depot
                            </h3>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Government Stand</span>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-6">
                                <div className="bg-orange-100 p-2 rounded-lg text-orange-600 mt-1">
                                    <Info size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Primary Routes</h4>
                                    <p className="text-gray-600">Ranchi, Jashpur, Chhattisgarh, and other long-distance interstate buses.</p>
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-inner h-64 border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.697849866846!2d84.53913847514337!3d23.181236110390865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b9356cb0409a9%3A0xc3f9829623023028!2sGumla%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1741021484461!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Gumla Main Depot Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Card B: Dunduriya Stand */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <MapPin className="fill-current" /> Dunduriya Stand
                            </h3>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Old Government Stand</span>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-6">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1">
                                    <Info size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Primary Routes</h4>
                                    <p className="text-gray-600">Simdega, Rourkela (Odisha), Lohardaga, Kuru, and Gaya routes.</p>
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-inner h-64 border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.6621985397554!2d84.54471697514339!3d23.182522710355416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b935102506e7b%3A0x6e71465485404548!2sDunduriya%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1741021535451!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Dunduriya Stand Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bus Results (Existing Logic) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Available Buses</h2>
                    {filteredBuses.length > 0 && (
                        <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
                            {filteredBuses.length} Buses Found
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <p className="text-gray-500 text-lg font-medium">Fetching the best rides for you...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl relative text-center shadow-sm" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : filteredBuses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBuses.map((bus) => (
                            <BusCard key={bus.id} bus={bus} onClick={() => navigate(`/bus/${bus.id}`)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-6">🚌</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No buses found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">We couldn't find any buses for this route. Try changing your search or ask <span className="text-indigo-600 font-bold">HamsafarAI</span> for help.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
