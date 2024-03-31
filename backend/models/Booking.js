
const mongoose=require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user_id:{
      type: String,
      required: true
    
    },
    tour_id: {
        type: String,
        required: true,
    },
    signed_activities:[ {
        type: String,
        required: true,
    },
    ],
    price:{
     type: Number,
     required: true,
    },
    bookFor:{
        type: String,
        required: true,
    },
    guestSize:{
      type: Number,
     required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
