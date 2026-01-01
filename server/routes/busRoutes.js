const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// @desc    Get all buses or filter by source/destination
// @route   GET /api/buses
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { from, to } = req.query;
        let query = {};

        if (from) {
            query.source = { $regex: from, $options: 'i' };
        }
        if (to) {
            query.destination = { $regex: to, $options: 'i' };
        }

        const buses = await Bus.find(query);
        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Create a new bus
// @route   POST /api/buses
// @access  Private (Admin) - Currently Open
router.post('/', async (req, res) => {
    const { name, source, destination, departureTime, arrivalTime, price, type, stand, contact, id } = req.body;

    try {
        const bus = new Bus({
            id: id || Math.floor(Math.random() * 10000), // Fallback ID generation
            name,
            source,
            destination,
            departureTime,
            arrivalTime,
            price,
            type,
            stand,
            contact
        });

        const newBus = await bus.save();
        res.status(201).json(newBus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
