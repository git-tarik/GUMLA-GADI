import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone, MessageSquare, Clock } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            console.log('Contact Form Submitted:', formData);
            alert('Thank you! We will reach out soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setLoading(false);
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
                    <p className="text-lg text-white/80">
                        Have questions about a route? Found a bug? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-4">
                                <Mail className="h-6 w-6 text-primary-500" />
                            </div>
                            <h3 className="text-lg font-bold text-secondary-500 mb-2">Email Us</h3>
                            <p className="text-gray-500 text-sm mb-2">We'll respond within 24 hours</p>
                            <a href="mailto:support@gumlagadi.com" className="text-primary-500 font-medium hover:underline">
                                support@gumlagadi.com
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-50 rounded-xl mb-4">
                                <MapPin className="h-6 w-6 text-accent-500" />
                            </div>
                            <h3 className="text-lg font-bold text-secondary-500 mb-2">Location</h3>
                            <p className="text-gray-500 text-sm mb-2">Based in Jharkhand, India</p>
                            <p className="text-gray-700 font-medium">Gumla Bus Stand Area</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mb-4">
                                <Clock className="h-6 w-6 text-green-500" />
                            </div>
                            <h3 className="text-lg font-bold text-secondary-500 mb-2">Support Hours</h3>
                            <p className="text-gray-500 text-sm mb-2">Available for assistance</p>
                            <p className="text-gray-700 font-medium">9 AM - 8 PM IST</p>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14660.840733796864!2d84.5323!3d23.0416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b1a5a5a5a5a5a%3A0x5a5a5a5a5a5a5a5a!2sGumla%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                className="grayscale-[0.3] hover:grayscale-0 transition-all"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl">
                                    <MessageSquare className="h-6 w-6 text-primary-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-secondary-500">Send us a Message</h2>
                                    <p className="text-gray-500 text-sm">Fill out the form below</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="input-label">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="input-label">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="input-label">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="input-label">Message</label>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="input-field resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
