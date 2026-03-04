import React from 'react';
import { Code, Database, Server, Smartphone, Cpu, Target, Users, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Mission</h1>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                        Gumla has two major bus stands — <span className="text-primary-300 font-semibold">Gumla Depot</span> and <span className="text-accent-300 font-semibold">Dunduriya Stand</span> — 
                        which often confuses travelers. We built <span className="text-white font-bold">Gumla Gadi</span> to solve this problem. 
                        Real-time tracking, accurate information, and AI assistance for every journey from Gumla.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24">
                    <div className="bg-white rounded-2xl shadow-card p-8 text-center border border-gray-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
                            <Target size={28} className="text-primary-500" />
                        </div>
                        <h3 className="text-lg font-bold text-secondary-500 mb-2">Clear Information</h3>
                        <p className="text-gray-500 text-sm">Know exactly which stand your bus departs from</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-card p-8 text-center border border-gray-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-50 rounded-2xl mb-4">
                            <Zap size={28} className="text-accent-500" />
                        </div>
                        <h3 className="text-lg font-bold text-secondary-500 mb-2">Real-Time Updates</h3>
                        <p className="text-gray-500 text-sm">Get accurate schedules and timing information</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-card p-8 text-center border border-gray-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-4">
                            <Users size={28} className="text-green-500" />
                        </div>
                        <h3 className="text-lg font-bold text-secondary-500 mb-2">AI Assistant</h3>
                        <p className="text-gray-500 text-sm">HamsafarAI helps you find routes instantly</p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary-500 mb-4">Meet the Team</h2>
                        <p className="text-gray-500">The builders behind Gumla Gadi</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Member 1 */}
                        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100 hover:shadow-card transition-shadow">
                            <div className="relative inline-block mb-4">
                                <img
                                    src="https://ui-avatars.com/api/?name=Tarik+Anwar&background=059669&color=fff&size=128&font-size=0.4"
                                    alt="Tarik"
                                    className="w-24 h-24 rounded-2xl shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-1.5 rounded-lg">
                                    <Code size={14} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-secondary-500">Tarik Anwar</h3>
                            <p className="text-primary-500 font-medium text-sm mb-3">Full Stack Developer & AI Engineer</p>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Architecting the backend, database, and AI integration for reliable systems.
                            </p>
                        </div>

                        {/* Member 2 */}
                        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100 hover:shadow-card transition-shadow">
                            <div className="relative inline-block mb-4">
                                <img
                                    src="https://ui-avatars.com/api/?name=Tajwid+Ahmad&background=1e293b&color=fff&size=128&font-size=0.4"
                                    alt="Tajwid"
                                    className="w-24 h-24 rounded-2xl shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-secondary-500 text-white p-1.5 rounded-lg">
                                    <Server size={14} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-secondary-500">Tajwid Ahmad</h3>
                            <p className="text-secondary-400 font-medium text-sm mb-3">Full Stack Developer & Cloud Engineer</p>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Crafting beautiful interfaces and managing cloud infrastructure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-gray-50 py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary-500 mb-4">Built With Modern Tech</h2>
                        <p className="text-gray-500">Powered by industry-leading technologies</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-w-[120px]">
                            <Database className="h-10 w-10 text-green-500 mb-3" />
                            <span className="font-semibold text-gray-700">MongoDB</span>
                            <span className="text-xs text-gray-400 mt-1">Database</span>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-w-[120px]">
                            <Server className="h-10 w-10 text-gray-700 mb-3" />
                            <span className="font-semibold text-gray-700">Express</span>
                            <span className="text-xs text-gray-400 mt-1">Backend</span>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-w-[120px]">
                            <Code className="h-10 w-10 text-blue-500 mb-3" />
                            <span className="font-semibold text-gray-700">React</span>
                            <span className="text-xs text-gray-400 mt-1">Frontend</span>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-w-[120px]">
                            <Smartphone className="h-10 w-10 text-green-600 mb-3" />
                            <span className="font-semibold text-gray-700">Node.js</span>
                            <span className="text-xs text-gray-400 mt-1">Runtime</span>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-w-[120px]">
                            <Cpu className="h-10 w-10 text-purple-600 mb-3" />
                            <span className="font-semibold text-gray-700">Python AI</span>
                            <span className="text-xs text-gray-400 mt-1">Intelligence</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
