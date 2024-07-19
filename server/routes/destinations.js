const express = require('express');
const { 
  createDestination, 
  singleDestination, 
  updateDestination, 
  deleteDestination,
  allDestinations
} = require('../controllers/DestinationController');
const upload = require('../config/multerConfig');

const router = express.Router();

// Create a new destination with photo upload
router.post('/', upload.single('image'), createDestination);

// Get a single destination along with its activities
router.get('/:id', singleDestination);

// Get a all destinations along with its activities
router.get('/', allDestinations);

// Update a destination with optional photo upload
router.put('/:id', upload.single('image'), updateDestination);

// Delete a destination and its related activities
router.delete('/:id', deleteDestination);

module.exports = router;
