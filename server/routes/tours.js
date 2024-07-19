const express = require('express');
const { 
  createTour, 
  singleTour, 
  allTour, 
  updateTour, 
  deleteTour 
} = require('../controllers/TourController');
const upload = require('../config/multerConfig');

const router = express.Router();

// Create a new tour with photo upload
router.post('/', upload.single('image'), createTour);

// Get a single tour
router.get('/:id', singleTour);

// Get all tours
router.get('/', allTour);

// Update a tour with photo upload
router.put('/:id', upload.single('image'), updateTour);

// Delete a tour
router.delete('/:id', deleteTour);

module.exports = router;
