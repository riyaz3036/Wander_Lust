
const mongoose=require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    dest_id :{
        type: String,
        required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    capacity:{
     type: Number,
     required: true,
    },
    vacancy: {
        type: Number,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
