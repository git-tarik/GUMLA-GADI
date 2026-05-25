import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import config from '../config';

const TruecallerAuthButton = ({ onAuthenticated, onError }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [sdkReady, setSdkReady] = useState(false);
    const { truecallerLogin } = useAuth();

    useEffect(() => {
        if (!config.TRUECALLER_CLIENT_ID) {
            return;
        }

        // Load Truecaller SDK
        const script = document.createElement('script');
        script.src = 'https://sdk.truecaller.com/v1/truecaller.js';
        script.async = true;
        script.onload = () => {
            if (window.Truecaller) {
                try {
                    window.Truecaller.init({
                        appKey: config.TRUECALLER_CLIENT_ID,
                    });
                    setSdkReady(true);
                    console.log('Truecaller SDK initialized successfully');
                } catch (error) {
                    console.error('Failed to initialize Truecaller:', error);
                }
            }
        };
        script.onerror = () => {
            console.error('Failed to load Truecaller SDK');
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup
        };
    }, []);

    const handleTruecallerClick = async () => {
        if (!sdkReady || !window.Truecaller) {
            onError && onError('Truecaller SDK not ready');
            return;
        }

        setIsLoading(true);

        try {
            // Listen for callback before opening
            window.Truecaller.onReceProfile(async (profile) => {
                try {
                    if (profile.requestId && profile.status === 'success') {
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
                } finally {
                    setIsLoading(false);
                }
            });

            // Open Truecaller verification
            window.Truecaller.getProfile();
        } catch (error) {
            console.error('Failed to open Truecaller:', error);
            onError && onError(error.message || 'Failed to open Truecaller');
            setIsLoading(false);
        }
    };

    if (!config.TRUECALLER_CLIENT_ID) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={handleTruecallerClick}
            disabled={!sdkReady || isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-gray-400"
            title={sdkReady ? 'Sign in with Truecaller' : 'Loading Truecaller...'}
        >
            <Phone size={20} className="text-blue-600" />
            <span>{isLoading ? 'Verifying...' : 'Continue with Truecaller'}</span>
        </button>
    );
};

export default TruecallerAuthButton;
