
const Booking = require('../models/Booking.js');
const Tour = require('../models/Tour.js');
const User = require('../models/User.js');


//creating a new tour (done) (Tested)
const createTour = async(req,res)=>{

    const newTour = new Tour(req.body)

    try{

        const savedTour = await newTour.save()

        res.status(200).json({success:true, message: 'Succesfully created', data:savedTour});

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to create. please try again!!'});
    }
}




//getSingle  tour (done)(Tested)
const singleTour = async (req,res)=>{


    //populate and show
    const id= req.params.id;

    
        

         try{
            const tour = await Tour.findById(id).populate({path:'destinations' , model:'Destination'});
            res.status(200).json({success:true, message: 'Succesfully shown', data: tour});
    
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }  
        

}

//getAll  tour (done)(Tested)
const allTour = async (req,res)=>{

         try{
            const tour = await Tour.find({}).populate({path:'destinations' , model:'Destination'});
            res.status(200).json({success:true, message: 'Succesfully shown', data: tour});
    
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }  


         
        
}

//updating a tour (done) (testes)
const updateTour = async (req,res)=>{

    const id=req.params.id

    try{
        const updatedTour = await Tour.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message: 'Succesfully updated', data:updatedTour});
    }catch(err){
        res.status(500).json({success:false, message: 'Failed to updat please try again!!'});
    }
}


//getAll users by tour (done)
const allUsersByTour = async (req,res)=>{
   
    const tourId = req.params.id;
    

    try {
        
        const bookings = await Booking.find({ tour_id: tourId });

        let finalData =[];

        //iterate for bookings and 
        for (const booking of bookings) {
          const user= await User.findById(booking.user_id);
          

            const singleData = {
                bookDate: booking.bookFor,
                guestSize: booking.guestSize,
                username: user.username
            }

            finalData.push(singleData);
            
        }
     
        if (bookings) {
            res.status(200).json({ success: true, message: 'Successfully shown', data: finalData });
        } else {
            res.status(404).json({ success: false, message: 'No bookings found for the specified tour' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to show, please try again!', error: err.message });
    }

}





module.exports = {createTour,singleTour,allTour,allUsersByTour,updateTour};