import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import UserLayout from '../Layout/UserLayout';
import Login from '../Pages/Login';
import PageNotFound from '../Pages/PageNotFound';
import Register from '../Pages/Register';
import DashboardAnalytics from '../Pages/admin/DashboardAnalytics';
import ManageBooking from '../Pages/admin/ManageBooking';
import BalancePay from '../Pages/user/BalancePay';
import Home from '../Pages/Home';
import Pricing from '../Pages/Pricing';
import Profile from '../Pages/user/UserProfile';
import Thankyou from '../Pages/user/Thankyou';
import TourDetails from '../Pages/user/TourDetails';
import RouteConstants from '../constants/RouteConstants';
import { authStore } from '../store/auth.store';
import MembershipPayment from '../Pages/user/MembershipPayment';
import ManageTour from '../Pages/admin/ManageTour';
import ManageDestination from '../Pages/admin/ManageDestination';
import ManageActivity from '../Pages/admin/ManageActivity';
import { useAuth } from '../auth/AuthProvider';
import { RolesEnum } from '../enums/roles.enum';
import Tours from '../Pages/user/Tours';
import Destinations from '../Pages/user/Destinations';


const Routers = () => {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path={RouteConstants.root} element={<Navigate to={user === undefined || user === null || user.role === RolesEnum.USER ? RouteConstants.home : RouteConstants.analytics} />} />

            {/* User Routes */}
            <Route path={RouteConstants.home} element={<UserLayout><Home /></UserLayout>} />
            <Route path={RouteConstants.login} element={<UserLayout><Login /></UserLayout>} />
            <Route path={RouteConstants.register} element={<UserLayout><Register /></UserLayout>} />
            <Route path={RouteConstants.tours} element={<UserLayout><TourDetails /></UserLayout>} />
            <Route path={RouteConstants.allTours} element={<UserLayout><Tours /></UserLayout>} />
            <Route path={RouteConstants.AllDestinations} element={<UserLayout><Destinations /></UserLayout>} />
            <Route path={RouteConstants.thankYou} element={<UserLayout><Thankyou /></UserLayout>} />
            <Route path={RouteConstants.pricing} element={<UserLayout><Pricing /></UserLayout>} />
            <Route path={RouteConstants.membershipPayment} element={<UserLayout><MembershipPayment /></UserLayout>} />
            <Route path={RouteConstants.balancePay} element={<UserLayout><BalancePay /></UserLayout>} />
            <Route path={RouteConstants.profile} element={<UserLayout><Profile /></UserLayout>} />

            {/* Admin Routes */}
            <Route path={RouteConstants.manageTour} element={<AdminLayout><ManageTour /></AdminLayout>} />
            <Route path={RouteConstants.manageDestination} element={<AdminLayout><ManageDestination /></AdminLayout>} />
            <Route path={RouteConstants.manageActivity} element={<AdminLayout><ManageActivity /></AdminLayout>} />
            <Route path={RouteConstants.manageBookings} element={<AdminLayout><ManageBooking /></AdminLayout>} />
            <Route path={RouteConstants.analytics} element={<AdminLayout><DashboardAnalytics /></AdminLayout>} />

            {/* Common */}
            <Route path={RouteConstants.pageNotFound} element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;
