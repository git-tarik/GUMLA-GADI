import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Clock, IndianRupee, Bus, Calendar, Users, Shield } from 'lucide-react';
import axios from 'axios';
import config from '../config';

const BusDetails = () => {
    const { id } = useParams();
    const [bus, setBus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBus = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/buses`);
                const foundBus = response.data.find(b => b.id === parseInt(id));
                setBus(foundBus);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bus details:', error);
                setLoading(false);
            }
        };
        fetchBus();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary-500"></div>
                    </div>
                    <p className="text-gray-500 font-medium">Loading details...</p>
                </div>
            </div>
        );
    }

    if (!bus) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                        <Bus size={40} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Bus Not Found</h2>
                    <p className="text-gray-500 mb-4">The bus you're looking for doesn't exist.</p>
                    <Link to="/" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium">
                        <ArrowLeft size={18} />
                        Go Back Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 mb-6 transition-colors text-sm font-medium">
                    <ArrowLeft size={18} />
                    Back to Search
                </Link>

                <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className={`px-6 py-8 md:px-10 ${bus.stand === 'Gumla Depot' ? 'bg-gradient-to-r from-primary-500 to-primary-600' : 'bg-gradient-to-r from-accent-500 to-accent-600'}`}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{bus.name}</h1>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm font-medium">
                                        {bus.type}
                                    </span>
                                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm font-medium flex items-center gap-1">
                                        <MapPin size={14} />
                                        {bus.stand}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-white/70 text-sm">Starting from</p>
                                <p className="text-3xl font-bold text-white">₹{bus.price}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-8 md:px-10 space-y-8">
                        {/* Route Info */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Departure</p>
                                <p className="text-2xl font-bold text-gray-800">{bus.source}</p>
                                <p className="text-lg text-primary-500 font-semibold mt-1">{bus.departureTime}</p>
                            </div>

                            <div className="hidden md:flex flex-1 items-center justify-center px-8">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                                    <div className="h-0.5 flex-1 bg-gray-300 relative">
                                        <Bus size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 bg-gray-50 p-0.5" />
                                    </div>
                                    <div className="w-3 h-3 bg-primary-500 rounded-full flex-shrink-0"></div>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Arrival</p>
                                <p className="text-2xl font-bold text-gray-800">{bus.destination}</p>
                                <p className="text-lg text-primary-500 font-semibold mt-1">{bus.arrivalTime}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center p-5 rounded-xl bg-green-50 border border-green-100">
                                <div className="p-3 bg-white rounded-xl mr-4 shadow-sm">
                                    <IndianRupee size={24} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Price per Seat</p>
                                    <p className="text-2xl font-bold text-green-700">₹{bus.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-5 rounded-xl bg-primary-50 border border-primary-100">
                                <div className="p-3 bg-white rounded-xl mr-4 shadow-sm">
                                    <Phone size={24} className="text-primary-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide">Contact Number</p>
                                    <p className="text-xl font-bold text-primary-700">{bus.contact}</p>
                                    <a href={`tel:${bus.contact}`} className="text-sm text-primary-500 hover:underline font-medium">
                                        Call Now →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-secondary-500 mb-4 flex items-center gap-2">
                                <Shield size={20} className="text-primary-500" />
                                About this service
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                This bus service operates daily between <span className="font-semibold text-gray-800">{bus.source}</span> and <span className="font-semibold text-gray-800">{bus.destination}</span>.
                                Please arrive at <span className="font-semibold text-gray-800">{bus.stand}</span> at least 15 minutes before departure.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg border border-gray-200">
                                    <Calendar size={14} />
                                    Daily Service
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg border border-gray-200">
                                    <Users size={14} />
                                    Counter Booking
                                </span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <a 
                            href={`tel:${bus.contact}`}
                            className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                        >
                            Call to Book Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusDetails;
