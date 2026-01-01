const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/buses',
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Response Status:', res.statusCode);
        console.log('Body:', data.substring(0, 200) + '...'); // Truncate output
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
