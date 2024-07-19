const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  dest_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  vacancy: { type: Number, required: true },
});

module.exports = mongoose.model('Activity', activitySchema);
