const Booking = require('../models/Booking.js');
const User = require('../models/User.js');
const Tour = require('../models/Tour.js');
const Activity = require('../models/Activity.js');




//creating a new user (done) (tested)
const createUser = async(req,res)=>{

    const newUser = new User(req.body)

    try{

            const savedUser = await newUser.save();
        

        res.status(200).json({success:true, message: 'Succesfully created', data:savedUser});

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to create. please try again!!'});
    }
}


//updating a user (done) (testes)
const updateUser = async (req,res)=>{

    const id=req.params.id

    try{
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message: 'Succesfully updated', data:updatedUser});
    }catch(err){
        res.status(500).json({success:false, message: 'Failed to updat please try again!!'});
    }
}


//deleting a user (done)
const deleteUser = async (req,res)=>{

    const id= req.params.id;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({success:true, message: 'Succesfully deleted', data:deletedUser})

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to delete please try again!!'});
    }
}

//getSingle  user(done) (tested)
const singleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        const { bookings } = user;

        let finalData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone,
            membership: user.membership,
            balance: user.balance,
            bookings: []
        };

        // Use map instead of forEach
        await Promise.all(bookings.map(async (bookingId) => {
            try {
                const book = await Booking?.findById(bookingId);
                if (!book) {
                    throw new Error(`Booking with ID ${bookingId} not found.`);
                }
                const { user_id, tour_id } = book;
                const u = await User.findById(user_id);
                const tour = await Tour.findById(tour_id);

                
                const fetchActivityDetails = async (book) => {
                    try {
                        const activityDetails = [];
                        for (const activityId of book.signed_activities) {
                            const activity = await Activity.findById(activityId);
                            if (activity) {
                                activityDetails.push(activity);
                            } else {
                                console.log(`Activity with ID ${activityId} not found.`);
                            }
                        }
                        return activityDetails;
                    } catch (error) {
                        console.error('Error fetching activity details:', error);
                        throw error; // Optionally re-throw the error to handle it at a higher level
                    }
                };


                

// Use the fetched activity details after the promise resolves


       
                const singleBookData = {
                    _id: book._id,
                    user: {
                        _id: u._id,
                        username: u.username,
                        email: u.email,
                        phone: u.phone,
                        balance: u.balance,
                        membership: u.membership
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
                    signed_activities: [],
                    price: book.price,
                    bookFor: book.bookFor,
                    guestSize: book.guestSize,
                    createdAt: book.createdAt,
                    updatedAt: book.updatedAt,
                };

                // // fetchActivityDetails(book)
                // .then(activityDetails => {
                //     // Use the fetched activity details here
                //     console.log(activityDetails)
                //     singleBookData.signed_activities = activityDetails;
                // })
                // .catch(error => {
                //     // Handle errors here
                //     console.error(error);
                // });

                const activityDetails = await fetchActivityDetails(book);
                singleBookData.signed_activities = activityDetails;




                finalData.bookings.push(singleBookData);
            } catch (err) {
                console.error('Error fetching booking data:', err);
            }
        }));

        
        res.status(200).json({ success: true, message: 'Successfully shown', data: finalData });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Failed to show, please try again!', error: err.message });
    }
}

//getAll  users (done) (tested)
const allUsers = async (req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({success:true, message: 'Succesfully shown', data: users});
    }catch(err){
        res.status(404).json({success:false, message: 'Failed to show please try again!!'});
    }
}


//add booking 

const updateUserBook = async (req, res) => {
    const id = req.params.id;
    const { BookingId } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Add the BookingId to the bookings array field
        user.bookings.push(BookingId);

        // Save the updated user
        const updatedUser = await user.save();

        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update, please try again!', error: err.message });
    }
}




module.exports = {createUser,updateUser,deleteUser,singleUser,allUsers, updateUserBook};