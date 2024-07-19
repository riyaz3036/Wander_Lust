const express = require('express');
const { createBooking, singleBooking, allBookingsByUser, allBookings, deleteBooking } = require('../controllers/BookingController');

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get a single booking
router.get('/:id', singleBooking);

// Get all bookings for a user
router.get('/user/:id', allBookingsByUser);

// Get all bookings
router.get('/', allBookings);

// Delete a booking
router.delete('/:id', deleteBooking);

module.exports = router;
