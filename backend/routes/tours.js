const express= require('express');
const Tour = require('../models/Tour.js');
const {createTour,singleTour,allTour,allUsersByTour,updateTour} = require( "./../controllers/TourController.js");

const router = express.Router()

//to create a new tour
router.post('/', createTour);

//to get single tours
router.get('/:id', singleTour);

//to get all tours
router.get('/', allTour);

//to update tour
router.put('/:id', updateTour);

//to get all users by tour
 router.get('/all/:id', allUsersByTour);




module.exports = router;

