import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Clock, IndianRupee } from 'lucide-react';
import axios from 'axios';

const BusDetails = () => {
    const { id } = useParams();
    const [bus, setBus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBus = async () => {
            try {
                // Fetch all buses and find (Temporary until API supports ID)
                const response = await axios.get('http://localhost:5000/api/buses');
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
                    <p className="text-xl text-gray-500">Loading details...</p>
                </div>
            </div>
        );
    }

    if (!bus) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Bus Not Found</h2>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Go Back Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-1" />
                    Back to Search
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-indigo-600 px-6 py-8 md:px-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{bus.name}</h1>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm border border-white/30">
                                {bus.type}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/30 ${bus.stand === 'Gumla Depot' ? 'bg-red-500/20 text-white border-red-400' : 'bg-blue-500/20 text-white border-blue-400'
                                }`}>
                                {bus.stand}
                            </span>
                        </div>
                    </div>

                    <div className="px-6 py-8 md:px-10 space-y-8">
                        {/* Route Info */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">From</p>
                                    <p className="text-xl font-bold text-gray-800">{bus.source}</p>
                                    <p className="text-sm text-gray-600">{bus.departureTime}</p>
                                </div>
                            </div>

                            <div className="hidden md:flex flex-1 mx-8 items-center justify-center">
                                <div className="h-0.5 w-full bg-gray-300 relative">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 p-1">
                                        <Clock size={16} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center text-right md:text-left">
                                <div className="md:text-right">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">To</p>
                                    <p className="text-xl font-bold text-gray-800">{bus.destination}</p>
                                    <p className="text-sm text-gray-600">{bus.arrivalTime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center p-4 rounded-lg bg-green-50 text-green-800 border border-green-100">
                                <div className="p-3 bg-white rounded-full mr-4 shadow-sm">
                                    <IndianRupee size={24} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase opacity-70">Price per Seat</p>
                                    <p className="text-xl font-bold">₹{bus.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-100">
                                <div className="p-3 bg-white rounded-full mr-4 shadow-sm">
                                    <Phone size={24} className="text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase opacity-70">Contact Number</p>
                                    <p className="text-xl font-bold">{bus.contact}</p>
                                    <a href={`tel:${bus.contact}`} className="text-sm underline hover:no-underline mt-1 block">Call Now</a>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Placeholder */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">About this service</h3>
                            <p className="text-gray-600 leading-relaxed">
                                This bus service operates daily between {bus.source} and {bus.destination}.
                                Please arrive at {bus.stand} at least 15 minutes before departure.
                                Tickets are available at the counter or can be booked by calling the number above.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusDetails;
