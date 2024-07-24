const Activity = require('../models/Activity');
const Destination = require('../models/Destination');
const Tour = require('../models/Tour');

// Create a new activity
const createActivity = async (req, res) => {
  
  try {
    const { title, dest_id, price, description, capacity, vacancy } = req.body;
    const newActivity = new Activity({
      title,
      dest_id,
      price,
      description,
      capacity,
      vacancy,
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single activity
const singleActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all activities
const allActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an activity
const updateActivity = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an activity
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Fetch the destination related to the activity
    const destination = await Destination.findById(activity.dest_id);
    if (destination) {
      const tour = await Tour.findById(destination.tour_id);
      if (tour) {
        tour.vacancy += activity.capacity; // Assuming all capacities are added back
        await tour.save();
      }
    }

    // Delete the activity
    await Activity.findByIdAndDelete(id);
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createActivity,
  singleActivity,
  allActivities,
  updateActivity,
  deleteActivity,
};
