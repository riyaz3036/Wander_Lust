import AllDestinations from "../Components/ManageDestination/AllDestinations";

const RouteConstants = {
    root: '/',
    home: '/home',
    login: '/login',
    register: '/register',
    tours: '/tour/:id',
    allTours: '/tours',
    AllDestinations: '/destinations',
    thankYou: '/thank-you',
    pricing: '/pricing',
    manageTour: '/manage-tour',
    manageDestination: '/manage-destination',
    manageActivity: '/manage-activity',
    manageBookings: '/manage-bookings',
    membershipPayment: '/membership-payment/:id',
    balancePay: '/balance-pay/:id',
    profile: '/profile',
    analytics: '/analytics',
    pageNotFound: '/page-not-found'
};


export const secureRoutes = [
  RouteConstants.thankYou,
  RouteConstants.manageTour,
  RouteConstants.manageDestination,
  RouteConstants.manageActivity,
  RouteConstants.manageBookings,
  RouteConstants.membershipPayment,
  RouteConstants.balancePay,
  RouteConstants.profile,
  RouteConstants.analytics
];


export default RouteConstants;
  