import React, { useState, useEffect } from 'react';
import { Search, Clock, MapPin, ArrowRight, Shield, Headphones, TrendingUp, Bus } from 'lucide-react';
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-secondary-500 via-primary-700 to-primary-600 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center mb-10 animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">NEW</span>
                            <span className="text-white/90 text-sm font-medium">AI-Powered Hamsafar Assistant</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            Safar Asaan, Gumla Ki Pehchaan
                        </h1>
                        <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto">
                            Real-time bus tracking for Gumla Depot & Dunduriya Stand
                        </p>
                    </div>

                    {/* Search Box - Modern Card Style */}
                    <div className="max-w-4xl mx-auto animate-slide-up">
                        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* From Input */}
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-secondary-500 uppercase tracking-wide mb-2 pl-1">
                                        From
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <div className="w-3 h-3 bg-primary-500 rounded-full ring-4 ring-primary-100"></div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter source city"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-0 transition-all text-gray-800 font-medium outline-none text-base"
                                            value={from}
                                            onChange={(e) => setFrom(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Swap Icon - Hidden on Mobile */}
                                <div className="hidden md:flex items-end pb-2">
                                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center border border-primary-100">
                                        <ArrowRight size={18} className="text-primary-500" />
                                    </div>
                                </div>

                                {/* To Input */}
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-secondary-500 uppercase tracking-wide mb-2 pl-1">
                                        To
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <div className="w-3 h-3 bg-accent-500 rounded-full ring-4 ring-accent-100"></div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter destination city"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-0 transition-all text-gray-800 font-medium outline-none text-base"
                                            value={to}
                                            onChange={(e) => setTo(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="flex items-end">
                                    <button
                                        onClick={handleSearch}
                                        className="w-full md:w-auto bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 px-8 py-4 text-base active:scale-[0.98]"
                                    >
                                        <Search size={20} />
                                        <span>Search Buses</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Routes Section */}
            <div className="bg-white border-b border-gray-100 py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <span className="text-xs font-bold text-secondary-500 uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp size={14} className="text-primary-500" />
                            Popular Routes
                        </span>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { to: 'Ranchi', label: 'Gumla → Ranchi' },
                                { to: 'Lohardaga', label: 'Gumla → Lohardaga' },
                                { to: 'Simdega', label: 'Gumla → Simdega' },
                                { to: 'Jashpur(chhattisgarh)', label: 'Gumla → Jashpur' }
                            ].map((route) => (
                                <button
                                    key={route.to}
                                    onClick={() => handleQuickSearch('Gumla', route.to)}
                                    className="px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-800 border border-primary-200 hover:border-primary-300 rounded-full text-sm font-semibold transition-all"
                                >
                                    {route.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bus Results Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Available Buses</h2>
                        <p className="text-gray-600 text-sm mt-1">Find and compare bus services</p>
                    </div>
                    {filteredBuses.length > 0 && (
                        <span className="bg-primary-100 text-primary-700 text-sm font-bold px-4 py-2 rounded-full border border-primary-200">
                            {filteredBuses.length} {filteredBuses.length === 1 ? 'Bus' : 'Buses'} Found
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-200 border-t-primary-600"></div>
                        </div>
                        <p className="text-gray-600 font-medium">Searching available buses...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl text-center text-sm font-medium" role="alert">
                        {error}
                    </div>
                ) : filteredBuses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBuses.map((bus) => (
                            <BusCard key={bus.id} bus={bus} onClick={() => navigate(`/bus/${bus.id}`)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                            <Bus size={40} className="text-gray-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No buses found</h3>
                        <p className="text-gray-600 text-sm max-w-sm mx-auto">Try changing your search criteria or explore popular routes above.</p>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose Gumla Gadi?</h2>
                        <p className="text-gray-600 mt-2">Your trusted bus information partner</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-primary-50/50 rounded-2xl border border-primary-100/50">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                                <Clock size={28} className="text-primary-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Real-Time Updates</h3>
                            <p className="text-gray-600 text-sm">Get accurate departure and arrival times for all buses</p>
                        </div>
                        
                        <div className="text-center p-6 bg-accent-50/50 rounded-2xl border border-accent-100/50">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-4">
                                <Shield size={28} className="text-accent-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Information</h3>
                            <p className="text-gray-600 text-sm">All bus details are verified and regularly updated</p>
                        </div>
                        
                        <div className="text-center p-6 bg-secondary-50 rounded-2xl border border-secondary-100">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-2xl mb-4">
                                <Headphones size={28} className="text-primary-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">AI Assistant</h3>
                            <p className="text-gray-600 text-sm">HamsafarAI helps you find the right bus instantly</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bus Stand Guide Section */}
            <div className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bus Stand Guide</h2>
                        <p className="text-gray-600 mt-2">Know your departure point before you travel</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Card A: Gumla Main Depot */}
                        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-200 hover:shadow-card-hover transition-shadow">
                            <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-400"></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            Gumla Main Depot
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">Primary hub for long-distance travel</p>
                                    </div>
                                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        Government
                                    </span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    Routes to <span className="font-semibold text-gray-900">Ranchi, Jashpur, Chhattisgarh</span> and other long-distance destinations.
                                </p>
                                <div className="flex items-center gap-2 text-primary-600 text-sm font-medium">
                                    <MapPin size={16} />
                                    <span>Main Bus Stand Road</span>
                                </div>
                            </div>
                            <div className="h-56 bg-gray-100 relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.697849866846!2d84.53913847514337!3d23.181236110390865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b9356cb0409a9%3A0xc3f9829623023028!2sGumla%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1741021484461!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Gumla Main Depot Map"
                                    className="grayscale-[0.2] hover:grayscale-0 transition-all duration-300"
                                ></iframe>
                            </div>
                        </div>

                        {/* Card B: Dunduriya Stand */}
                        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-200 hover:shadow-card-hover transition-shadow">
                            <div className="h-2 bg-gradient-to-r from-accent-500 to-accent-400"></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            Dunduriya Stand
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">Hub for regional connections</p>
                                    </div>
                                    <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        Regional
                                    </span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    Routes to <span className="font-semibold text-gray-900">Simdega, Rourkela, Lohardaga</span> and nearby regional destinations.
                                </p>
                                <div className="flex items-center gap-2 text-accent-600 text-sm font-medium">
                                    <MapPin size={16} />
                                    <span>Dunduriya Area</span>
                                </div>
                            </div>
                            <div className="h-56 bg-gray-100 relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.6621985397554!2d84.54471697514339!3d23.182522710355416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b935102506e7b%3A0x6e71465485404548!2sDunduriya%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1741021535451!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Dunduriya Stand Map"
                                    className="grayscale-[0.2] hover:grayscale-0 transition-all duration-300"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
