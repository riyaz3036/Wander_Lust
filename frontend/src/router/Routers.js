import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './../Pages/Home';
import Login from './../Pages/Login';
import Register from './../Pages/Register';
import TourDetails from './../Pages/TourDetails';
import Thankyou from '../Pages/Thankyou';
import MyBookings from '../Pages/MyBookings';
import ToggleMembership from './../Pages/ToggleMembership';
import Pricing from './../Pages/Pricing';
import AddTour from '../Pages/AddTour';
import AddDestination from '../Pages/AddDestination';
import AddActivity from '../Pages/AddActivity';
import ManageBooking from '../Pages/ManageBooking';
import Payment from '../Pages/Payment';
import BalancePay from '../Pages/BalancePay';


const Routers = () => {
    
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'/Home'} />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tours/:id' element={<TourDetails />} />
            <Route path='/thank-you' element={<Thankyou />} />
            <Route path='/my-bookings' element={<MyBookings />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/toggle-membership' element={<ToggleMembership />} />
            <Route path='/add-tour' element={<AddTour />} />
            <Route path='/add-destination' element={<AddDestination />} />
            <Route path='/add-activity' element={<AddActivity />} />
            <Route path='/manage-bookings' element={<ManageBooking />} />
            <Route path='/payment/:id' element={<Payment />} />
            <Route path='/balance-pay/:id' element={<BalancePay />} />
        </Routes>
    );
};

export default Routers;
