/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import config from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            return JSON.parse(storedUser);
        }

        return null;
    });
    const [loading] = useState(false);

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

    const googleLogin = async (credential) => {
        const response = await axios.post(`${config.API_BASE_URL}/api/auth/google`, { credential });
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setUser(response.data);
        return response.data;
    };

    const truecallerLogin = async (accessToken) => {
        const response = await axios.post(`${config.API_BASE_URL}/api/auth/truecaller`, { accessToken });
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setUser(response.data);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, googleLogin, truecallerLogin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
