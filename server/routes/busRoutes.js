const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

const { protect, adminOnly } = require('../middleware/authMiddleware');

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
// @access  Private (Admin)
router.post('/', protect, adminOnly, async (req, res) => {
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

// @desc    Delete a bus
// @route   DELETE /api/buses/:id
// @access  Private (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        // Find by custom ID first (since frontend uses that), fallback to _id
        const bus = await Bus.findOne({ id: req.params.id }) || await Bus.findById(req.params.id);

        if (bus) {
            await Bus.deleteOne({ _id: bus._id });
            res.json({ message: 'Bus removed' });
        } else {
            res.status(404).json({ message: 'Bus not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
