import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Phone, BusFront } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(name, email, phone, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-500 to-secondary-600 p-12 flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <BusFront className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Gumla Gadi</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                        Start your journey with us today
                    </h1>
                    <p className="text-white/80 text-lg">
                        Create an account to track buses, save your favorite routes, and get personalized recommendations.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                        <span>Real-time bus tracking</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                        <span>AI-powered assistance</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                        <span>100% Free to use</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="bg-primary-500 p-2 rounded-xl">
                                <BusFront className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-secondary-500">Gumla Gadi</span>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-secondary-500 mb-2">Create your account</h2>
                        <p className="text-gray-500">Join thousands of travelers</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="input-label">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="input-field pl-11"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="input-field pl-11"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    required
                                    className="input-field pl-11"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="input-label">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="input-field pl-11"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm text-center font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary-500 hover:text-primary-600">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
