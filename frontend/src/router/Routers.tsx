import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import UserLayout from '../Layout/UserLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import PageNotFound from '../Pages/PageNotFound';
import Pricing from '../Pages/Pricing';
import Register from '../Pages/Register';
import DashboardAnalytics from '../Pages/admin/DashboardAnalytics';
import ManageActivity from '../Pages/admin/ManageActivity';
import ManageBooking from '../Pages/admin/ManageBooking';
import ManageDestination from '../Pages/admin/ManageDestination';
import ManageTour from '../Pages/admin/ManageTour';
import BalancePay from '../Pages/user/BalancePay';
import Destinations from '../Pages/user/Destinations';
import MembershipPayment from '../Pages/user/MembershipPayment';
import Thankyou from '../Pages/user/Thankyou';
import TourDetails from '../Pages/user/TourDetails';
import Tours from '../Pages/user/Tours';
import Profile from '../Pages/user/UserProfile';
import { useAuth } from '../auth/AuthProvider';
import RouteConstants from '../constants/RouteConstants';
import { RolesEnum } from '../enums/roles.enum';
import { toJS } from 'mobx';


const Routers = () => {
    const { user } = useAuth();
    const userObj = toJS(user); 

    const defaultRedirect =
    userObj && userObj.role === RolesEnum.ADMIN
        ? RouteConstants.analytics
        : RouteConstants.home;

    return (
        <Routes>
            <Route path={RouteConstants.root} element={<Navigate to={defaultRedirect} />} />

            {/* User Routes */}
            <Route path={RouteConstants.home} element={<Home />} />
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
