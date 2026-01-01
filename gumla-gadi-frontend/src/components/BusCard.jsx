import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

const BusCard = ({ bus, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-100"
        >
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{bus.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bus.type === 'AC' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {bus.type}
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <MapPin size={16} />
                    <span className="text-sm">{bus.source} ➝ {bus.destination}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <Clock size={16} />
                    <span className="text-sm">{bus.departureTime} - {bus.arrivalTime}</span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Price</span>
                        <span className="font-bold text-lg text-green-600">₹{bus.price}</span>
                    </div>

                    {/* Conditional Stand Badge */}
                    <div>
                        {bus.stand === "Gumla Depot" ? (
                            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md border border-red-200">
                                Main Stand
                            </span>
                        ) : bus.stand === "Dunduriya" ? (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md border border-blue-200">
                                Dunduriya Stand
                            </span>
                        ) : (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-md">
                                {bus.stand}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusCard;
