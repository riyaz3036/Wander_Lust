
const mongoose=require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },  
    tour_id:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    activities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
    },
    ],  
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);
