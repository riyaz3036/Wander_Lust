import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './../Pages/Home';
import Login from './../Pages/Login';
import Register from './../Pages/Register';
import TourDetails from './../Pages/TourDetails';
import Thankyou from '../Pages/Thankyou';
import Pricing from './../Pages/Pricing';
import AddTour from '../Pages/AddTour';
import AddDestination from '../Pages/AddDestination';
import AddActivity from '../Pages/AddActivity';
import ManageBooking from '../Pages/ManageBooking';
import Payment from '../Pages/Payment';
import BalancePay from '../Pages/BalancePay';
import Profile from '../Pages/Profile';
import DasboardAnalytics from '../Pages/DashboardAnalytics'

const Routers = () => {
    
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'/Home'} />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tours/:id' element={<TourDetails />} />
            <Route path='/thank-you' element={<Thankyou />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/add-tour' element={<AddTour />} />
            <Route path='/add-destination' element={<AddDestination />} />
            <Route path='/add-activity' element={<AddActivity />} />
            <Route path='/manage-bookings' element={<ManageBooking />} />
            <Route path='/payment/:id' element={<Payment />} />
            <Route path='/balance-pay/:id' element={<BalancePay />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/analytics' element={<DasboardAnalytics />} />
        </Routes>
    );
};

export default Routers;
