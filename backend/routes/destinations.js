const express= require('express');
const Tour = require('../models/Tour.js');
const {createDestination,singleDestination,allDestinations} = require( "./../controllers/DestinationController.js");

const router = express.Router()

//to create a new destination
router.post('/', createDestination);

//to get single destination
router.get('/:id', singleDestination);

//to get all destinations
router.get('/', allDestinations);




module.exports = router;