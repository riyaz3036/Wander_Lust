// controllers/UserController.js

const User = require('../models/User');
const Booking = require('../models/Booking');
const Tour = require('../models/Tour');  // Import Tour model
const Destination = require('../models/Destination');  // Import Destination model
const Activity = require('../models/Activity');  // Import Activity model
const path = require('path');

// Get a single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the user from the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle the profile picture update
    if (req.file) {
      user.profile_picture = req.file.path;  // Update profile picture
    }
    console.log(req.body);
    // Update user information
    if (req.body.role) {
      user.role = req.body.role;
    }
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;  // You should hash the password in a real application
    }
    if (req.body.phone) {
      user.phone = req.body.phone;
    }
    if (req.body.membership) {
      user.membership = req.body.membership;
    }
    if (req.body.balance) {
      user.balance = req.body.balance;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find and delete all bookings by this user
    await Booking.deleteMany({ user_id: id });

    // Find all tours
    const tours = await Tour.find();

    // Update vacancies for each tour
    for (const tour of tours) {
      // Find all destinations in the tour
      const destinations = await Destination.find({ tour_id: tour._id });

      for (const destination of destinations) {
        // Find all activities in the destination
        const activities = await Activity.find({ dest_id: destination._id });

        for (const activity of activities) {
          // Add back the vacancies for each activity
          const booking = await Booking.findOne({
            tour_id: tour._id,
            signed_activities: activity._id.toString()
          });

          if (booking) {
            activity.vacancy += booking.guestSize;
            await activity.save();
          }
        }
      }

      // Add back the vacancies for the tour
      const tourBooking = await Booking.findOne({
        tour_id: tour._id,
      });

      if (tourBooking) {
        tour.vacancy += tourBooking.guestSize;
        await tour.save();
      }
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User and their bookings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add balance to user
const addBal = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Get the user from the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's balance
    user.balance = (user.balance || 0) + amount;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Balance added successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  addBal
};
