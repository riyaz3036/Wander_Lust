const Activity = require('../models/Activity');
const Destination = require('../models/Destination');
const Tour = require('../models/Tour');
const User = require('../models/User'); 
const Booking = require('../models/Booking');

// Get all counts
const getCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const tourCount = await Tour.countDocuments();
    const activityCount = await Activity.countDocuments();
    const destinationCount = await Destination.countDocuments();
    const bookingCount = await Booking.countDocuments(); 

    const counts = {
      users: userCount,
      tours: tourCount,
      activities: activityCount,
      destinations: destinationCount,
      bookings: bookingCount, 
    };

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCount,
};
