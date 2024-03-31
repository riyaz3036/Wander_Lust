const Booking = require('../models/Booking.js');
const User = require('../models/User.js');
const Tour = require('../models/Tour.js');
const mongoose = require('mongoose');

//creating a new Booking (done) (Tested)
const createBooking = async(req,res)=>{

    const newBooking = new Booking(req.body)
    
    try{

        const savedBooking = await newBooking.save()
        

        res.status(200).json({success:true, message: 'Succesfully created booking', data:savedBooking});

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to create. please try again!!'});
    }
}


//deleting a Delete a Booking (done) (Tested)
const deleteBooking = async (req,res)=>{3

    const id= req.params.id;
    try{
        const deletedBooking = await Booking.findByIdAndDelete(id);
        res.status(200).json({success:true, message: 'Succesfully deleted booking', data:deletedBooking})

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to delete please try again!!'});
    }
}

//get Booiking by booking id(done) (Tested)
const singleBooking = async (req,res)=>{

    const id= req.params.id;

        
        try{
            
            

            //const booking = await Booking.findById(id);
            const booking = await Booking.findById(id);
            console.log(booking);
  

            
             const {user_id,tour_id}=booking;
             
             const user =  await User.findById(user_id);
             console.log(user_id);
             const tour = await Tour.findById(tour_id);
            
            
            
            
            const responseData = {
                booking: {
                    _id: booking._id,
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        balance: user.balance,
                        membership: user.membership
                    },
                    tour: {
                        _id: tour._id,
                        title: tour.title,
                        location: tour.location,
                        photo: tour.photo,
                        description: tour.description,
                        vacancy: tour.vacancy,
                        duration: tour.duration,
                        price: tour.price,
                        capacity: tour.capacity
                    },
                    signed_activities: booking.signed_activities,
                    price: booking.price,
                    bookFor: booking.bookFor,
                    guestSize: booking.guestSize,
                    createdAt: booking.createdAt,
                    updatedAt: booking.updatedAt
                }
            };

            

            res.status(200).json({success:true, message: 'Succesfully shown', data: responseData});
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }
        
}


module.exports = {createBooking,deleteBooking,singleBooking};
