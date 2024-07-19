const Destination = require('../models/Destination');
const Tour = require('../models/Tour');
const Activity = require('../models/Activity');

// Create a new tour (Tested)
const createTour = async (req, res) => {
  try {
    const { title, location, description, duration, price, capacity, vacancy, start_date } = req.body;
    const image = req.file ? req.file.path : '';

    const newTour = new Tour({
      title,
      location,
      image,
      description,
      duration,
      price,
      capacity,
      vacancy,
      start_date,
    });

    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single tour (Tested)
const singleTour = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the tour by its ID
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Find the destinations associated with the tour
    const destinations = await Destination.find({ tour_id: id }).lean();

    // Populate activities for each destination
    for (let i = 0; i < destinations.length; i++) {
      const activities = await Activity.find({ dest_id: destinations[i]._id });
      destinations[i].activities = activities;
    }

    // Combine tour and destinations data
    const tourWithDestinations = {
      ...tour.toObject(),
      destinations: destinations
    };

    res.status(200).json(tourWithDestinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all tours (Tested)
const allTour = async (req, res) => {
  try {
    const tours = await Tour.find().lean();

    // For each tour, find its destinations and their activities
    const toursWithDestinations = await Promise.all(
      tours.map(async (tour) => {
        const destinations = await Destination.find({ tour_id: tour._id }).lean();

        for (let i = 0; i < destinations.length; i++) {
          const activities = await Activity.find({ dest_id: destinations[i]._id }).lean();
          destinations[i].activities = activities;
        }

        return {
          ...tour,
          destinations: destinations,
        };
      })
    );

    res.status(200).json(toursWithDestinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tour (Tested)
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file ? req.file.path : undefined;
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { ...req.body, image },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a tour
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the tour and its destinations
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Fetch all destinations related to the tour
    const destinations = await Destination.find({ tour_id: id });

    // Delete all destinations and associated activities
    for (const destination of destinations) {
      await Activity.deleteMany({ dest_id: destination._id });
      await Destination.findByIdAndDelete(destination._id);
    }

    // Delete the tour
    await Tour.findByIdAndDelete(id);

    res.status(200).json({ message: 'Tour and related destinations deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTour,
  singleTour,
  allTour,
  updateTour,
  deleteTour,
};
