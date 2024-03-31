import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../Pages/Home';
import Login from './../Pages/Login';
import Register from './../Pages/Register';
import TourDetails from './../Pages/TourDetails';
import Thankyou from '../Pages/Thankyou';
import Passengers from '../Pages/Passengers';
import MyBookings from '../Pages/MyBookings';
import ToggleMembership from './../Pages/ToggleMembership';



const Routers = () =>{
return (
    <Routes>

        <Route path='/' element={<Navigate to='/Home' />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/tours/:id' element={<TourDetails/>} />
        <Route path='/thank-you' element={<Thankyou/>} />
        <Route path='/passengers/:id' element={<Passengers/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/toggle-membership' element={<ToggleMembership />} />

        

    </Routes>
);
};

export default Routers;