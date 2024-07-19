const Destination = require('../models/Destination');
const Tour = require('../models/Tour');
const Activity = require('../models/Activity');

// Create a new destination
const createDestination = async (req, res) => {
  try {
    const { title, tour_id, description } = req.body;
    const image = req.file ? req.file.path : null;

    // Check if the tour exists
    const tour = await Tour.findById(tour_id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const newDestination = new Destination({
      title,
      tour_id,
      description,
      image,
    });

    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single destination
const singleDestination = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the destination by ID
    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Find activities related to this destination
    const activities = await Activity.find({ dest_id: id });

    // Convert Mongoose document to plain JavaScript object
    const destinationObject = destination.toObject();
    
    // Add activities array to the destination object
    destinationObject.activities = activities;

    // Send the response
    res.status(200).json(destinationObject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all destinations
const allDestinations = async (req, res) => {
  try {
    // Find all destinations
    const destinations = await Destination.find();

    // Iterate over each destination to fetch and add its activities
    const destinationsWithActivities = await Promise.all(destinations.map(async (destination) => {
      // Find activities related to this destination
      const activities = await Activity.find({ dest_id: destination._id });

      // Convert Mongoose document to plain JavaScript object
      const destinationObject = destination.toObject();
      
      // Add activities array to the destination object
      destinationObject.activities = activities;

      return destinationObject;
    }));

    // Send the response
    res.status(200).json(destinationsWithActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a destination
const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file ? req.file.path : null;
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      { ...req.body, image },
      { new: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json(updatedDestination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a destination
const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the destination and its activities
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Fetch all activities related to the destination
    const activities = await Activity.find({ dest_id: id });

    // Update vacancies in activities and tours
    for (const activity of activities) {
      const tour = await Tour.findById(destination.tour_id);
      if (tour) {
        tour.vacancy += activity.capacity; // Assuming all capacities are added back
        await tour.save();
      }

      activity.vacancy += activity.capacity; // Assuming all activities are canceled
      await activity.save();
    }

    // Delete all activities related to the destination
    await Activity.deleteMany({ dest_id: id });

    // Delete the destination
    await Destination.findByIdAndDelete(id);

    res.status(200).json({ message: 'Destination and related activities deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDestination,
  singleDestination,
  updateDestination,
  deleteDestination,
  allDestinations,
};
