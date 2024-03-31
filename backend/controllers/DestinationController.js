const Destination = require('../models/Destination.js');
const Tour = require('../models/Tour.js');
const mongoose = require('mongoose');


//creating a new Destination (done) (tested)
const createDestination = async(req,res)=>{

    const newDestination = new Destination(req.body)
    

    try{

        const savedDestination = await newDestination.save()
       
        

        //add ref to Tour
        let ObjId =new mongoose.Types.ObjectId(savedDestination._id);
       
        
        await Tour.updateOne(
            {
                _id: savedDestination.tour_id
            },
            {
                $push:{
                    destinations:ObjId
                },
            },
            {
                upsert: false, new:true
            },
        )

        res.status(200).json({success:true, message: 'Succesfully created destination', data:savedDestination});

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to create. please try again!!'});
    }
}



//getSingle Destination (done) (Tested)
const singleDestination = async (req,res)=>{

    const id= req.params.id;
    

        //populate with activity and send
        try{

            const destination = await Destination.findById(id).populate({path:'activities' , model:'Activity'});
    
            res.status(200).json({success:true, message: 'Succesfully shown', data: destination});
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }


        
}

//getAll  Destinations (done) (Tested)
const allDestinations = async (req,res)=>{
    try{
        //populate with activity and send
        const destinations = await Destination.find({}).populate({path:'activities' , model:'Activity'});

        res.status(200).json({success:true, message: 'Succesfully shown', data: destinations});
    }catch(err){
        res.status(404).json({success:false, message: 'Failed to show please try again!!'});
    }
}

module.exports = {createDestination,singleDestination,allDestinations};