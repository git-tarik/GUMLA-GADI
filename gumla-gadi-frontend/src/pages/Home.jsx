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
        <div className="min-h-screen bg-white font-sans selection:bg-indigo-50 selection:text-indigo-700">
            {/* Hero Section - Professional & Clean */}
            <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image - Subtle & High Quality */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-fade-in"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop")' }}
                >
                </div>
                {/* Gradient Overlay - Darker for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/30 z-10 backdrop-blur-[1px]"></div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pt-20">
                    <div className="animate-slide-up max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                            Safar Asaan, <br className="" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-200">Gumla Ki Pehchaan</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-normal leading-relaxed text-opacity-90">
                            Real-time bus tracking for Gumla Depot and Dunduriya Stand. Your reliable travel companion.
                        </p>
                    </div>

                    {/* Modern Search Bar - Minimal & Functional */}
                    <div className="animate-slide-up delay-200 w-full max-w-5xl mx-auto">
                        <div className="bg-white p-2 md:p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 relative border border-gray-100/20 backdrop-blur-sm bg-opacity-95">

                            {/* From Input */}
                            <div className="flex-1 relative group text-left">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin size={20} className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <div className="absolute top-2 left-12 text-[10px] font-bold text-gray-400 uppercase tracking-wider z-10">From</div>
                                <input
                                    type="text"
                                    placeholder="Enter source city"
                                    className="w-full pl-12 pr-4 pt-6 pb-2 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-0 focus:border-indigo-100 transition-all font-medium text-gray-900 outline-none text-base h-16"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                />
                            </div>

                            {/* Divider / Arrow */}
                            <div className="hidden md:flex items-center justify-center">
                                <div className="bg-gray-100 p-2 rounded-full text-gray-400">
                                    <ArrowRight size={18} />
                                </div>
                            </div>

                            {/* Mobile Divider */}
                            <div className="md:hidden w-full h-px bg-gray-100"></div>

                            {/* To Input */}
                            <div className="flex-1 relative group text-left">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin size={20} className="text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                                </div>
                                <div className="absolute top-2 left-12 text-[10px] font-bold text-gray-400 uppercase tracking-wider z-10">To</div>
                                <input
                                    type="text"
                                    placeholder="Enter destination city"
                                    className="w-full pl-12 pr-4 pt-6 pb-2 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:ring-0 focus:border-indigo-100 transition-all font-medium text-gray-900 outline-none text-base h-16"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                />
                            </div>

                            {/* Search Button */}
                            <div className="flex items-center">
                                <button
                                    onClick={handleSearch}
                                    className="w-full md:w-auto h-16 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 px-10 text-lg active:scale-[0.98]"
                                >
                                    <Search size={20} className="stroke-[2.5px]" />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Routes - Clean Chips */}
            <div className="bg-white border-b border-gray-100 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Popular Routes
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { to: 'Ranchi', label: 'Gumla ➝ Ranchi' },
                                { to: 'Lohardaga', label: 'Gumla ➝ Lohardaga' },
                                { to: 'Simdega', label: 'Gumla ➝ Simdega' },
                                { to: 'Jashpur(chhattisgarh)', label: 'Gumla ➝ Jashpur' }
                            ].map((route) => (
                                <button
                                    key={route.to}
                                    onClick={() => handleQuickSearch('Gumla', route.to)}
                                    className="px-4 py-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-700 border border-gray-200 hover:border-indigo-200 rounded-lg text-sm font-medium transition-all"
                                >
                                    {route.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bus Results (MOVED UP) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Available Buses</h2>
                    {filteredBuses.length > 0 && (
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                            {filteredBuses.length} Results
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-300 border-t-indigo-600 mx-auto mb-4"></div>
                        <p className="text-gray-500 font-medium">Searching available buses...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-lg text-center text-sm" role="alert">
                        {error}
                    </div>
                ) : filteredBuses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBuses.map((bus) => (
                            <BusCard key={bus.id} bus={bus} onClick={() => navigate(`/bus/${bus.id}`)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="text-4xl mb-4 opacity-30">🚍</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No buses found</h3>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto">We couldn't find any buses for this route. Try changing your search criteria.</p>
                    </div>
                )}
            </div>

            {/* Bus Stand Guide Section (MOVED DOWN) */}
            <div className="bg-gray-50 py-20 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Bus Stand Guide</h2>
                        <p className="text-gray-500 mt-2">Know your departure point before you travel.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Card A: Gumla Main Depot */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 border-b border-gray-100 bg-white">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        Gumla Main Depot
                                    </h3>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">Government</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Primary hub for <span className="font-semibold text-gray-900">Long-Distance</span> travel.
                                    <br />Routes: Ranchi, Jashpur, Chhattisgarh.
                                </p>
                                <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
                                    <MapPin size={16} /> <span>Main Bus Stand Road</span>
                                </div>
                            </div>
                            <div className="h-64 bg-gray-100 relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.697849866846!2d84.53913847514337!3d23.181236110390865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b9356cb0409a9%3A0xc3f9829623023028!2sGumla%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1741021484461!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Gumla Main Depot Map"
                                    className="filter grayscale-[0.3] hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>
                        </div>

                        {/* Card B: Dunduriya Stand */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 border-b border-gray-100 bg-white">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        Dunduriya Stand
                                    </h3>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">Private / Old</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Hub for <span className="font-semibold text-gray-900">Regional</span> connections.
                                    <br />Routes: Simdega, Rourkela, Lohardaga.
                                </p>
                                <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                                    <MapPin size={16} /> <span>Dunduriya Area</span>
                                </div>
                            </div>
                            <div className="h-64 bg-gray-100 relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.6621985397554!2d84.54471697514339!3d23.182522710355416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b935102506e7b%3A0x6e71465485404548!2sDunduriya%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1741021535451!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Dunduriya Stand Map"
                                    className="filter grayscale-[0.3] hover:grayscale-0 transition-all duration-500"
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
