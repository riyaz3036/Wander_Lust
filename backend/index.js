const express= require('express');
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const cors= require('cors');
const cookieParser = require('cookie-parser');
const tourRoute = require('./routes/tours.js');
const userRoute = require('./routes/users.js');
const authRoute = require('./routes/auth.js');
const destinationRoute = require('./routes/destinations.js');
const ActivityRoute = require('./routes/activities.js');
const BookingRoute = require('./routes/bookings.js');

dotenv.config();

const app= express();
const port = process.env.PORT || 8000;

const corsOptions={
    origin: true,
    methods: ["POST", "GET" ,"PUT", "DELETE"],
    credentials: true
}

//Database connection
//pass- XD6ubSIAvU4W3gxV


const connect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://riyazmittu:XD6ubSIAvU4W3gxV@cluster0.xyuldkr.mongodb.net/wanderLust?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('connected to Mongodb');


    }catch(err){
        console.log('Mongodb connection failed',err.message);
    }
}


//Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


//any req to /tours is sent to tour Route
app.use("/tours",tourRoute);

//any request to /users
app.use('/users', userRoute);

//login and register
app.use('/auth',authRoute);

//all requests to /destination
app.use('/destination',destinationRoute);

//all requests to /activity
app.use('/activity',ActivityRoute);

//all requests to /booking
app.use('/booking',BookingRoute);




app.listen(port,()=>{
    connect();  
    console.log('server listening on port',port);
})

