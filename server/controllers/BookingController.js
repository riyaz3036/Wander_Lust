const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const Activity = require('../models/Activity');
const User = require('../models/User');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { user_id, tour_id, signed_activities, price, bookFor, guestSize } = req.body;
    
    // Create a new booking
    const newBooking = new Booking({
      user_id,
      tour_id,
      signed_activities,
      price,
      bookFor,
      guestSize,
    });


    await newBooking.save();

    // Update vacancies in the tour and activities
    const tour = await Tour.findById(tour_id);
    if (tour) {
      tour.vacancy -= guestSize;
      await tour.save();
    }

    //Update vacancies in Activity
    for (const activityId of signed_activities) {
      const activity = await Activity.findById(activityId);
      if (activity) {
        activity.vacancy -= guestSize; 
        await activity.save();
      }
    }

    //Update the Balance of user
    const user = await User.findById(user_id);
    if(user){
      user.balance-=price;
      await user.save();
    }

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Single Booking
const singleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate('user_id')
      .populate('tour_id')
      .populate('signed_activities');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all bookings for a user
const allBookingsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.find({ user_id: id })
      .populate('user_id') 
      .populate('signed_activities') 
      .populate('tour_id'); 

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
const allBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user_id', 'name email') 
      .populate('signed_activities', 'title price') 
      .populate('tour_id', 'title location price'); 

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update vacancies in tour and activities
    const tour = await Tour.findById(booking.tour_id);
    if (tour) {
      tour.vacancy += booking.guestSize;
      await tour.save();
    }
    
    //add vacancies back 
    for (const activityId of booking.signed_activities) {
      const activity = await Activity.findById(activityId);
      if (activity) {
        activity.vacancy += guestSize; 
        await activity.save();
      }
    }

    //Refund the user
    const user = await User.findById(booking.user_id);
    if (user) {
      user.balance += booking.price;
      await user.save();
    }

    // Delete the booking
    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  singleBooking,
  allBookingsByUser,
  allBookings,
  deleteBooking,
};
