import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import config from '../config';

const googleClientId = config.GOOGLE_CLIENT_ID;
let googleScriptPromise;

const loadGoogleScript = () => {
    if (window.google?.accounts?.id) {
        return Promise.resolve();
    }

    if (!googleScriptPromise) {
        googleScriptPromise = new Promise((resolve, reject) => {
            const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');

            if (existingScript) {
                existingScript.addEventListener('load', resolve, { once: true });
                existingScript.addEventListener('error', reject, { once: true });
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    return googleScriptPromise;
};

const GoogleAuthButton = ({ onAuthenticated, onError, text = 'continue_with' }) => {
    const buttonRef = useRef(null);
    const [loadFailed, setLoadFailed] = useState(false);
    const { googleLogin } = useAuth();

    useEffect(() => {
        if (!googleClientId || !buttonRef.current) {
            return;
        }

        let isMounted = true;

        loadGoogleScript()
            .then(() => {
                if (!isMounted || !buttonRef.current) return;

                window.google.accounts.id.initialize({
                    client_id: googleClientId,
                    callback: async (response) => {
                        try {
                            await googleLogin(response.credential);
                            onAuthenticated?.();
                        } catch (error) {
                            onError?.(error.response?.data?.message || 'Google authentication failed');
                        }
                    },
                });

                buttonRef.current.innerHTML = '';
                window.google.accounts.id.renderButton(buttonRef.current, {
                    theme: 'outline',
                    size: 'large',
                    type: 'standard',
                    shape: 'rectangular',
                    text,
                    logo_alignment: 'left',
                    width: buttonRef.current.offsetWidth || 320,
                });
            })
            .catch(() => {
                if (isMounted) setLoadFailed(true);
                onError?.('Unable to load Google sign-in');
            });

        return () => {
            isMounted = false;
        };
    }, [googleLogin, onAuthenticated, onError, text]);

    if (!googleClientId || loadFailed) {
        return (
            <button
                type="button"
                disabled
                className="w-full border border-gray-300 text-gray-400 font-semibold py-3 rounded-lg bg-gray-50 cursor-not-allowed"
            >
                Google sign-in unavailable
            </button>
        );
    }

    return <div ref={buttonRef} className="w-full min-h-[44px] flex justify-center" />;
};

export default GoogleAuthButton;
