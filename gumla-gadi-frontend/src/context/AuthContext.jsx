import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for existing session
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await axios.post(`${config.API_BASE_URL}/api/auth/login`, { email, password });
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setUser(response.data);
        return response.data;
    };

    const signup = async (name, email, phone, password) => {
        const response = await axios.post(`${config.API_BASE_URL}/api/auth/signup`, { name, email, phone, password });
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setUser(response.data);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
