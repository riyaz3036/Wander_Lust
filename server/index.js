const express= require('express');
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const cors= require('cors');
const path = require('path');
const tourRoute = require('./routes/tours.js');
const userRoute = require('./routes/users.js');
const authRoute = require('./routes/auth.js');
const destinationRoute = require('./routes/destinations.js');
const activityRoute = require('./routes/activities.js');
const bookingRoute = require('./routes/bookings.js');
const analyticsRoute = require('./routes/analytics.js');


dotenv.config();

const app= express();
const port = process.env.PORT || 8000;

const corsOptions={
    origin: true,
    methods: ["POST", "GET" ,"PUT", "DELETE"],
    credentials: true
}

//Database connection
const connect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://riyazmittu:zwD6eM7FGNDhfC4s@cluster0.k7h5qfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
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


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/tours', tourRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/destinations', destinationRoute);
app.use('/activities', activityRoute);
app.use('/bookings', bookingRoute);
app.use('/analytics', analyticsRoute);


app.listen(port,()=>{
    connect();  
    console.log('server listening on port',port);
})