import React from 'react';
import { Code, Database, Server, Smartphone, Cpu } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Mission Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Our Mission</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Gumla creates confusion with its two major stands: <span className="font-semibold text-orange-600">Gumla Depot</span> and <span className="font-semibold text-blue-600">Dunduriya Stand</span>.
                        We built <span className="text-blue-900 font-bold">Gumla Gadi</span> to solve this problem once and for all.
                        Real-time tracking, accurate stand info, and AI assistance — simplifying every journey from Gumla.
                    </p>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {/* Member 1 */}
                        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow border-t-4 border-orange-500">
                            <img
                                src="https://ui-avatars.com/api/?name=Tarik+Anwar&background=f97316&color=fff&size=128"
                                alt="Tarik"
                                className="w-32 h-32 rounded-full mb-4 shadow-md"
                            />
                            <h3 className="text-2xl font-bold text-gray-900">Tarik Anwar</h3>
                            <p className="text-orange-500 font-medium mb-4">Full Stack Developer & AI Engineer</p>
                            <p className="text-gray-500 text-center">
                                Architecting the backend, database, and AI integration because robust systems drive reliable journeys.
                            </p>
                        </div>

                        {/* Member 2 */}
                        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow border-t-4 border-blue-600">
                            <img
                                src="https://ui-avatars.com/api/?name=Tajwid+Ahmad&background=2563eb&color=fff&size=128"
                                alt="Tajwid"
                                className="w-32 h-32 rounded-full mb-4 shadow-md"
                            />
                            <h3 className="text-2xl font-bold text-gray-900">Tajwid Ahmad</h3>
                            <p className="text-blue-600 font-medium mb-4">Full Stack Developer & Cloud Engineer</p>
                            <p className="text-gray-500 text-center">
                                Crafting beautiful, intuitive interfaces to ensure every user feels at home while traveling.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white rounded-2xl shadow-sm p-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Built With Modern Tech</h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex flex-col items-center text-gray-600">
                            <Database className="h-12 w-12 text-green-500 mb-2" />
                            <span className="font-semibold">MongoDB</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-600">
                            <Server className="h-12 w-12 text-gray-700 mb-2" />
                            <span className="font-semibold">Express</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-600">
                            <Code className="h-12 w-12 text-blue-500 mb-2" />
                            <span className="font-semibold">React</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-600">
                            <Smartphone className="h-12 w-12 text-green-600 mb-2" />
                            <span className="font-semibold">Node.js</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-600">
                            <Cpu className="h-12 w-12 text-purple-600 mb-2" />
                            <span className="font-semibold">Python AI</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
