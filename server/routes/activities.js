const express = require('express');
const { createActivity, singleActivity, allActivities, updateActivity, deleteActivity } = require('../controllers/ActivityController');

const router = express.Router();

// Create a new activity
router.post('/', createActivity);

// Get a single activity
router.get('/:id', singleActivity);

// Get all activities 
router.get('/', allActivities);

// Update an activity
router.put('/:id', updateActivity);

// Delete an activity
router.delete('/:id', deleteActivity);

module.exports = router;
