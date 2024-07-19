const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tour_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  image: { type: String, default: null},
  description: { type: String, required: true },
});

module.exports = mongoose.model('Destination', destinationSchema);
