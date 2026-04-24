import React, { useState } from 'react';
import { User, Mail, Lock, Phone, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import GoogleAuthButton from './GoogleAuthButton';
import logo from '../assets/gumla-gadi-logo.png';

const SignupModal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signup } = useAuth();
    const { modals, closeModal, toggleModals } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(name, email, phone, password);
            closeModal('signup');
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginToggle = () => {
        toggleModals('signup', 'login');
    };

    const handleGoogleAuthenticated = () => {
        setError('');
        closeModal('signup');
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
    };

    if (!modals.signup) return null;

    return (
        <>
            {/* Backdrop Blur */}
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => closeModal('signup')}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-12 pb-6 px-4 sm:px-6 overflow-y-auto">
                <div className="w-full max-w-md">
                    {/* Beautiful Card with Subtle Green Border */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary-200 relative">
                        {/* Decorative Top Border Gradient */}
                        <div className="h-1.5 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-300" />

                        {/* Close Button */}
                        <button
                            onClick={() => closeModal('signup')}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-all z-10"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center mb-6">
                                    <img src={logo} alt="Gumla Gadi" className="h-20 w-auto object-contain" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">Join Us Today</h2>
                                <p className="text-gray-500 text-sm">Create your account to get started</p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-700 text-sm font-medium">{error}</p>
                                </div>
                            )}

                            <div className="mb-5">
                                <GoogleAuthButton
                                    onAuthenticated={handleGoogleAuthenticated}
                                    onError={setError}
                                />
                            </div>

                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex-1 h-px bg-gray-300" />
                                <span className="text-gray-500 text-sm font-medium">or</span>
                                <div className="flex-1 h-px bg-gray-300" />
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                                        <input
                                            type="email"
                                            required
                                            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                                        <input
                                            type="tel"
                                            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50"
                                            placeholder="+91 9876543210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            className="w-full pl-11 pr-11 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50"
                                            placeholder="Create a strong password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        <span>Create Account</span>
                                    )}
                                </button>
                            </form>

                            {/* Login Link */}
                            <div className="text-center mt-5">
                                <p className="text-gray-600 text-sm">
                                    Already have an account?{' '}
                                    <button
                                        onClick={handleLoginToggle}
                                        className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Bottom Decorative Border */}
                        <div className="h-1.5 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-300" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupModal;
