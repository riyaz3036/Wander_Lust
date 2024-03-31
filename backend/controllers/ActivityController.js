const Activity = require('../models/Activity.js');
const Destination = require('../models/Destination.js');
const mongoose = require('mongoose');

 

//creating a new Activity (done) (Tested)
const createActivity = async(req,res)=>{
    

    const newActivity = new Activity(req.body)
    

    try{

        const savedActivity = await newActivity.save()
       

        //add ref to destination
        let ObjId =new mongoose.Types.ObjectId(savedActivity._id);
        await Destination.updateOne(
            {
                _id: savedActivity.dest_id
            },
            {
                $push:{
                    activities:ObjId
                },
            },
            {
                upsert: false, new:true
            },
        )
        

        res.status(200).json({success:true, message: 'Succesfully created Activity', data:savedActivity});

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to create. please try again!!'});
    }
}




//getSingle Activity (done) (tested)
const singleActivity = async (req,res)=>{

    const id= req.params.id;
    try{
        const activity = await Activity.findById(id);
        res.status(200).json({success:true, message: 'Succesfully shown', data: activity});

    }catch(err){
        res.status(404).json({success:false, message: 'Failed to show please try again!!'});
    }
}

//getAll  vacant Activitys (done) (Tested)
const allVacantActivities = async (req,res)=>{
    try {
        const activities = await Activity.find({ vacancy: { $ne: 0 } });
        res.status(200).json({ success: true, message: 'Successfully found activities', data: activities });
    } catch (error) {
        console.error('Error finding activities:', error);
        res.status(500).json({ success: false, message: 'Failed to find activities' });
    }
}


//updating a activity (done) (testes)
const updateActivity = async (req,res)=>{

    const id=req.params.id

    try{
        const updatedActivity = await Activity.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message: 'Succesfully updated', data:updatedActivity});
    }catch(err){
        res.status(500).json({success:false, message: 'Failed to updat please try again!!'});
    }
}

module.exports = {createActivity,singleActivity,allVacantActivities,updateActivity};