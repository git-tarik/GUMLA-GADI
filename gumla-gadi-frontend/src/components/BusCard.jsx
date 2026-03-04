import React from 'react';
import { Clock, MapPin, ChevronRight, Wifi, Snowflake } from 'lucide-react';

const BusCard = ({ bus, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 group"
        >
            {/* Top Color Bar */}
            <div className={`h-1 ${bus.stand === 'Gumla Depot' ? 'bg-primary-500' : 'bg-accent-500'}`}></div>
            
            <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-secondary-500 group-hover:text-primary-500 transition-colors">
                            {bus.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            {bus.type === 'AC' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                                    <Snowflake size={10} />
                                    AC
                                </span>
                            )}
                            {bus.type !== 'AC' && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                    Non-AC
                                </span>
                            )}
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            From
                        </div>
                        <p className="font-semibold text-gray-800">{bus.source}</p>
                        <p className="text-sm text-gray-500">{bus.departureTime}</p>
                    </div>
                    
                    <div className="flex-shrink-0 px-3">
                        <div className="w-16 h-px bg-gray-200 relative">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center">
                                <span className="text-gray-400 text-xs">→</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 text-right">
                        <div className="flex items-center justify-end gap-2 text-gray-500 text-xs uppercase tracking-wide mb-1">
                            To
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        </div>
                        <p className="font-semibold text-gray-800">{bus.destination}</p>
                        <p className="text-sm text-gray-500">{bus.arrivalTime}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Starting from</p>
                        <p className="text-xl font-bold text-primary-500">₹{bus.price}</p>
                    </div>

                    {/* Stand Badge */}
                    <div>
                        {bus.stand === "Gumla Depot" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold rounded-lg border border-primary-100">
                                <MapPin size={12} />
                                Main Depot
                            </span>
                        ) : bus.stand === "Dunduriya" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-50 text-accent-600 text-xs font-semibold rounded-lg border border-accent-100">
                                <MapPin size={12} />
                                Dunduriya
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg">
                                <MapPin size={12} />
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
