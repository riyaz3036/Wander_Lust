const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String,default: null},
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  vacancy: { type: Number, required: true },
  start_date: { type: Date, required: true },
});

module.exports = mongoose.model('Tour', tourSchema);
