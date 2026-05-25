import React, { useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import config from '../config';

const TruecallerAuthButton = ({ onAuthenticated, onError, text = 'continue_with' }) => {
    const buttonRef = useRef(null);
    const [loadFailed, setLoadFailed] = useState(false);
    const { truecallerLogin } = useAuth();

    useEffect(() => {
        if (!config.TRUECALLER_CLIENT_ID || loadFailed) {
            console.warn('Truecaller config missing or load failed:', {
                clientId: config.TRUECALLER_CLIENT_ID,
                loadFailed
            });
            return;
        }

        console.log('Loading Truecaller SDK...');

        // Check if Truecaller SDK is already loaded
        if (window.Truecaller) {
            console.log('Truecaller SDK already loaded');
            initTruecaller();
            return;
        }

        // Load Truecaller SDK
        const script = document.createElement('script');
        script.src = 'https://sdk.truecaller.com/v1/truecaller.js';
        script.async = true;
        script.onload = () => {
            console.log('Truecaller SDK loaded successfully');
            initTruecaller();
        };
        script.onerror = () => {
            console.error('Failed to load Truecaller SDK from CDN');
            setLoadFailed(true);
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup
        };
    }, [loadFailed]);

    const initTruecaller = async () => {
        if (!window.Truecaller || !buttonRef.current) {
            console.warn('Truecaller SDK not available or button ref not set');
            return;
        }

        try {
            console.log('Initializing Truecaller with key:', config.TRUECALLER_CLIENT_ID);
            
            window.Truecaller.init({
                appKey: config.TRUECALLER_CLIENT_ID,
            });

            window.Truecaller.build({
                buttonColor: '#0066FF',
                buttonText: 'truecaller_default',
                lang: 'en',
                hideOption: false,
            }).render(buttonRef.current);

            console.log('Truecaller button rendered successfully');

            // Listen for callback
            window.Truecaller.onReceProfile(handleTruecallerResponse);
        } catch (error) {
            console.error('Failed to initialize Truecaller:', error);
            setLoadFailed(true);
        }
    };

    const handleTruecallerResponse = async (profile) => {
        try {
            if (profile.requestId && profile.status === 'success') {
                // Get access token from Truecaller response
                const accessToken = profile.accessToken || profile.token;

                if (!accessToken) {
                    throw new Error('No access token from Truecaller');
                }

                // Send token to backend
                await truecallerLogin(accessToken);
                onAuthenticated && onAuthenticated();
            } else if (profile.status === 'cancel') {
                onError && onError('Truecaller authentication cancelled');
            } else {
                throw new Error(profile.reason || 'Truecaller authentication failed');
            }
        } catch (error) {
            console.error('Truecaller Auth Error:', error);
            onError && onError(error.message || 'Truecaller authentication failed');
        }
    };

    if (loadFailed) {
        return (
            <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-500 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Truecaller SDK failed to load"
            >
                <Phone size={18} />
                <span>Truecaller unavailable</span>
            </button>
        );
    }

    return <div ref={buttonRef} id="truecaller-button" />;
};

export default TruecallerAuthButton;
