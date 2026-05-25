const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const userResponse = (user) => ({
    _id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatar: user.avatar,
    authProvider: user.authProvider,
    token: generateToken(user._id, user.role),
});

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Password strength validation (minimum 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Name validation (minimum 2 characters)
        if (name.length < 2) {
            return res.status(400).json({ message: 'Name must be at least 2 characters long' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            phone,
            password,
        });

        if (user) {
            res.status(201).json(userResponse(user));
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json(userResponse(user));
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate or register a user with Google
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
    const { credential } = req.body;

    try {
        if (!process.env.GOOGLE_CLIENT_ID) {
            return res.status(500).json({ message: 'Google authentication is not configured' });
        }

        if (!credential) {
            return res.status(400).json({ message: 'Google credential is required' });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload?.email || !payload.email_verified) {
            return res.status(401).json({ message: 'Google account email is not verified' });
        }

        const email = payload.email.toLowerCase();
        let user = await User.findOne({ email });

        if (user) {
            user.googleId = user.googleId || payload.sub;
            user.avatar = payload.picture || user.avatar;
            if (user.authProvider !== 'google' && !user.password) {
                user.authProvider = 'google';
            }
            await user.save();
        } else {
            user = await User.create({
                name: payload.name || email.split('@')[0],
                email,
                googleId: payload.sub,
                avatar: payload.picture,
                authProvider: 'google',
            });
        }

        res.json(userResponse(user));
    } catch (error) {
        console.error('Google Auth Error:', error.message);
        res.status(401).json({ message: 'Google authentication failed' });
    }
};

// @desc    Authenticate or register a user with Truecaller
// @route   POST /api/auth/truecaller
// @access  Public
const truecallerAuth = async (req, res) => {
    const { accessToken } = req.body;

    try {
        if (!process.env.TRUECALLER_CLIENT_ID || !process.env.TRUECALLER_CLIENT_SECRET) {
            return res.status(500).json({ message: 'Truecaller authentication is not configured' });
        }

        if (!accessToken) {
            return res.status(400).json({ message: 'Truecaller access token is required' });
        }

        // Verify access token with Truecaller API and get user profile
        const axios = require('axios');
        const profileResponse = await axios.get('https://api.truecaller.com/v1/profile', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const profile = profileResponse.data;

        if (!profile?.data?.phoneNumber) {
            return res.status(401).json({ message: 'Unable to retrieve Truecaller profile information' });
        }

        // Extract user information
        const truecallerId = profile.data.id;
        const phone = profile.data.phoneNumber;
        const name = profile.data.firstName || 'Truecaller User';
        // Note: Truecaller doesn't provide email in some regions, so we create one from phone
        const email = profile.data.email || `${phone}@truecaller.com`;

        let user = await User.findOne({ $or: [{ email }, { truecallerId }] });

        if (user) {
            // Update existing user
            user.truecallerId = user.truecallerId || truecallerId;
            user.phone = phone;
            user.avatar = profile.data.profileImage || user.avatar;
            if (user.authProvider !== 'truecaller' && !user.password) {
                user.authProvider = 'truecaller';
            }
            await user.save();
        } else {
            // Create new user
            user = await User.create({
                name,
                email,
                phone,
                truecallerId,
                avatar: profile.data.profileImage,
                authProvider: 'truecaller',
            });
        }

        res.json(userResponse(user));
    } catch (error) {
        console.error('Truecaller Auth Error:', error.message);
        
        if (error.response?.status === 401) {
            return res.status(401).json({ message: 'Invalid or expired Truecaller access token' });
        }
        
        res.status(401).json({ message: 'Truecaller authentication failed' });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            avatar: req.user.avatar,
            authProvider: req.user.authProvider,
            role: req.user.role
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    googleAuth,
    truecallerAuth,
    getMe,
};
