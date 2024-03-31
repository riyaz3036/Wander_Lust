const express= require('express');
const {createBooking,deleteBooking,singleBooking}= require('./../controllers/BookingController.js');

const router = express.Router()

//to create a new Booking
router.post('/', createBooking);

//to delete a new Booking 
router.delete('/:id', deleteBooking);

//to get single Booking
router.get('/:id', singleBooking);





module.exports = router;