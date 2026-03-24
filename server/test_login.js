require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function testLogin() {
    try {
        console.log('=== Testing Login Flow ===\n');

        // Test 1: Check if server is running
        console.log('1. Checking if server is running...');
        try {
            const healthCheck = await axios.get(`${API_URL}/`);
            console.log('✓ Server is running\n');
        } catch (err) {
            console.error('✗ Server is NOT running. Start the server first: npm start\n');
            return;
        }

        // Test 2: Try signup first
        console.log('2. Testing Signup...');
        const testUser = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '9876543210',
            password: 'password123'
        };

        try {
            const signupResponse = await axios.post(`${API_URL}/api/auth/signup`, testUser);
            console.log('✓ Signup successful');
            console.log(`Token received: ${signupResponse.data.token ? 'YES' : 'NO'}\n`);
        } catch (err) {
            if (err.response?.status === 400 && err.response?.data?.message === 'User already exists') {
                console.log('⚠ User already exists (this is fine, we can login)\n');
            } else {
                console.error('✗ Signup failed:', err.response?.data?.message || err.message);
                console.error('Full error:', err.response?.data);
                return;
            }
        }

        // Test 3: Try login
        console.log('3. Testing Login...');
        try {
            const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
                email: testUser.email,
                password: testUser.password
            });
            console.log('✓ Login successful');
            console.log('Response data:');
            console.log({
                _id: loginResponse.data._id,
                name: loginResponse.data.name,
                email: loginResponse.data.email,
                role: loginResponse.data.role,
                token: loginResponse.data.token ? `${loginResponse.data.token.substring(0, 20)}...` : 'NO TOKEN'
            });
            console.log('\n✓ All tests passed! Login should work.\n');
        } catch (err) {
            console.error('✗ Login failed:', err.response?.data?.message || err.message);
            console.error('Full error:', err.response?.data);
            return;
        }

    } catch (err) {
        console.error('Unexpected error:', err.message);
    }
}

testLogin();
