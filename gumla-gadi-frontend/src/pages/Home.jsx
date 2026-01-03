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
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 selection:text-orange-600">
            {/* Hero Section */}
            <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-fade-in transition-transform duration-[20s] hover:scale-110"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop")' }}
                >
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-slate-50 z-10 backdrop-blur-[1px]"></div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pt-16">
                    <div className="animate-slide-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-200 text-sm font-semibold mb-6 backdrop-blur-md">
                            🚀 The Smartest Way to Travel in Gumla
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
                            Safar Asaan, <br className="" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Gumla Ki Pehchaan</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                            Real-time tracking for Gumla Depot and Dunduriya Stand. <br /> Your smart, reliable travel companion for every journey.
                        </p>
                    </div>

                    {/* Glassmorphism Search Bar */}
                    <div className="animate-slide-up delay-200 w-full max-w-5xl mx-auto">
                        <div className="bg-white/95 backdrop-blur-2xl p-4 md:p-5 rounded-3xl shadow-2xl border border-white/40 flex flex-col md:flex-row gap-4 relative">

                            {/* From Input */}
                            <div className="flex-1 relative group text-left">
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-4 uppercase tracking-wider">From</label>
                                <div className="relative group-focus-within:transform group-focus-within:-translate-y-1 transition-transform duration-200">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MapPin size={22} className="text-orange-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Source (e.g. Gumla)"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-semibold text-gray-800 outline-none text-lg shadow-inner"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Divider / Arrow for Desktop */}
                            <div className="hidden md:flex items-center justify-center pt-6">
                                <div className="bg-gray-100 p-2 rounded-full text-gray-400">
                                    <ArrowRight size={20} />
                                </div>
                            </div>

                            {/* To Input */}
                            <div className="flex-1 relative group text-left">
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-4 uppercase tracking-wider">To</label>
                                <div className="relative group-focus-within:transform group-focus-within:-translate-y-1 transition-transform duration-200">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MapPin size={22} className="text-indigo-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Destination (e.g. Ranchi)"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold text-gray-800 outline-none text-lg shadow-inner"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="flex items-end">
                                <button
                                    onClick={handleSearch}
                                    className="w-full md:w-auto bg-gradient-to-r from-gray-900 to-indigo-900 hover:from-black hover:to-indigo-950 text-white font-bold py-4 px-10 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 text-lg"
                                >
                                    <Search size={22} className="stroke-[3px]" />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Routes Section */}
            <div className="-mt-8 relative z-30 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-4 flex flex-wrap items-center justify-center gap-4 animate-slide-up delay-300">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2 mr-2">
                            <span className="bg-orange-100 p-1 rounded text-orange-600"><ArrowRight size={14} /></span> Popular:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { to: 'Ranchi', color: 'orange' },
                                { to: 'Lohardaga', color: 'blue' },
                                { to: 'Simdega', color: 'purple' },
                                { to: 'Jashpur(chhattisgarh)', label: 'Jashpur', color: 'green' }
                            ].map((route) => (
                                <button
                                    key={route.to}
                                    onClick={() => handleQuickSearch('Gumla', route.to)}
                                    className={`px-4 py-1.5 bg-${route.color}-50 hover:bg-${route.color}-100 text-${route.color}-700 border border-${route.color}-200 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 whitespace-nowrap`}
                                >
                                    Gumla → {route.label || route.to}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bus Stand Guide Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-indigo-200">Travel Guide</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 tracking-tight">Know Your Bus Stand</h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">Confused about where to catch your bus? We've organized everything for you.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Card A: Gumla Main Depot */}
                    <div className="group bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600"></div>
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/30 mb-2 inline-block">Government Stand</span>
                                <h3 className="text-3xl font-bold flex items-center gap-3">
                                    <MapPin className="fill-white text-orange-600" size={32} /> Gumla Main Depot
                                </h3>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="bg-orange-50 p-3 rounded-2xl text-orange-600 shrink-0 shadow-sm">
                                    <Info size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg mb-2">Major Interstate Routes</h4>
                                    <p className="text-gray-600 leading-relaxed">Primary hub for buses heading to <span className="font-semibold text-gray-900">Ranchi</span>, <span className="font-semibold text-gray-900">Jashpur</span>, <span className="font-semibold text-gray-900">Chhattisgarh</span>, and other long-distance destinations.</p>
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-md h-72 border-4 border-white ring-1 ring-gray-100 group-hover:ring-orange-200 transition-all">
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
                    <div className="group bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/30 mb-2 inline-block">Old / Private Stand</span>
                                <h3 className="text-3xl font-bold flex items-center gap-3">
                                    <MapPin className="fill-white text-blue-600" size={32} /> Dunduriya Stand
                                </h3>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                    <Info size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg mb-2">Regional & Local Routes</h4>
                                    <p className="text-gray-600 leading-relaxed">Best for <span className="font-semibold text-gray-900">Simdega</span>, <span className="font-semibold text-gray-900">Rourkela (Odisha)</span>, <span className="font-semibold text-gray-900">Lohardaga</span>, <span className="font-semibold text-gray-900">Kuru</span>, and <span className="font-semibold text-gray-900">Gaya</span> connectivity.</p>
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-md h-72 border-4 border-white ring-1 ring-gray-100 group-hover:ring-blue-200 transition-all">
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

            {/* Bus Results (Existing Logic with Enhanced UI) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Available Buses</h2>
                    {filteredBuses.length > 0 && (
                        <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
                            {filteredBuses.length} Buses Found
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-indigo-600 mx-auto mb-6"></div>
                        <p className="text-gray-500 text-lg font-medium animate-pulse">Fetching the best rides for you...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-2xl relative text-center shadow-sm" role="alert">
                        <strong className="font-bold text-lg block mb-1">Oops! Something went wrong.</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : filteredBuses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBuses.map((bus) => (
                            <BusCard key={bus.id} bus={bus} onClick={() => navigate(`/bus/${bus.id}`)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="text-6xl mb-6 grayscale opacity-80">🚌</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No buses found</h3>
                        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">We couldn't find any buses for this route. Try changing your search or ask <span className="text-indigo-600 font-bold cursor-pointer hover:underline">HamsafarAI</span> for help.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
