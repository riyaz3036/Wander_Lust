const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tour_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  signed_activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  price: { type: Number, required: true },
  bookFor: { type: String, required: true },
  guestSize: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
