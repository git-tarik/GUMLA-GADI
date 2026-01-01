require('dotenv').config();
const mongoose = require('mongoose');
const Bus = require('./models/Bus');
const mockBuses = require('../gumla-gadi-frontend/src/data/mockBuses.json');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();
    try {
        await Bus.deleteMany(); // Clear existing data
        console.log('Data Cleared');

        await Bus.insertMany(mockBuses);
        console.log('Data Imported Successfully');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
