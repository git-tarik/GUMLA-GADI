const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // Keeping ID from mock data for consistency checks, though MongoDB uses _id
    name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ['AC', 'Non-AC'], required: true },
    stand: { type: String, enum: ['Gumla Depot', 'Dunduriya'], required: true },
    contact: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bus', busSchema);
