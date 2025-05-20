import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Pages/user/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import TourDetails from '../Pages/user/TourDetails';
import Thankyou from '../Pages/user/Thankyou';
import Pricing from '../Pages/user/Pricing';
import AddTour from '../Pages/admin/AddTour';
import AddDestination from '../Pages/admin/AddDestination';
import AddActivity from '../Pages/admin/AddActivity';
import ManageBooking from '../Pages/admin/ManageBooking';
import Payment from '../Pages/user/Payment';
import BalancePay from '../Pages/user/BalancePay';
import Profile from '../Pages/user/Profile';
import DashboardAnalytics from '../Pages/admin/DashboardAnalytics';
import RouteConstants from '../constants/RouteConstants';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PageNotFound from '../Pages/PageNotFound';
import AdminLayout from '../Layout/AdminLayout';
import UserLayout from '../Layout/UserLayout';


const Routers = () => {
    const { user } = useContext(AuthContext);
    return (
        <Routes>
            <Route path={RouteConstants.root} element={<Navigate to={RouteConstants.home} />} />

            {/* User Routes */}
            <Route path={RouteConstants.home} element={<UserLayout><Home /></UserLayout>} />
            <Route path={RouteConstants.login} element={<UserLayout><Login /></UserLayout>} />
            <Route path={RouteConstants.register} element={<UserLayout><Register /></UserLayout>} />
            <Route path={RouteConstants.tours} element={<UserLayout><TourDetails /></UserLayout>} />
            <Route path={RouteConstants.thankYou} element={<UserLayout><Thankyou /></UserLayout>} />
            <Route path={RouteConstants.pricing} element={<UserLayout><Pricing /></UserLayout>} />
            <Route path={RouteConstants.payment} element={<UserLayout><Payment /></UserLayout>} />
            <Route path={RouteConstants.balancePay} element={<UserLayout><BalancePay /></UserLayout>} />
            <Route path={RouteConstants.profile} element={<UserLayout><Profile /></UserLayout>} />

            {/* Admin Routes */}
            <Route path={RouteConstants.addTour} element={<AdminLayout><AddTour /></AdminLayout>} />
            <Route path={RouteConstants.addDestination} element={<AdminLayout><AddDestination /></AdminLayout>} />
            <Route path={RouteConstants.addActivity} element={<AdminLayout><AddActivity /></AdminLayout>} />
            <Route path={RouteConstants.manageBookings} element={<AdminLayout><ManageBooking /></AdminLayout>} />
            <Route path={RouteConstants.analytics} element={<AdminLayout><DashboardAnalytics /></AdminLayout>} />

            {/* Common */}
            <Route path={RouteConstants.pageNotFound} element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;
