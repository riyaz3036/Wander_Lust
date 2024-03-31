
const mongoose=require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    vacancy: {
      type: Number,
      required: true,
    },

    destinations:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
