const express = require('express');
const { getCount} = require('../controllers/AnalyticsController');

const router = express.Router();

// Get a counts
router.get('/count', getCount);

module.exports = router;
