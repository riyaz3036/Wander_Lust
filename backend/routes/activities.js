const express= require('express');
const {createActivity,singleActivity,allVacantActivities,updateActivity} = require( "./../controllers/ActivityController.js");

const router = express.Router()

//to create a new Activity
router.post('/', createActivity);

//to get single Activities
router.get('/:id', singleActivity);

//to get all Activities
router.get('/', allVacantActivities);

//to update 
router.put('/:id', updateActivity);




module.exports = router;