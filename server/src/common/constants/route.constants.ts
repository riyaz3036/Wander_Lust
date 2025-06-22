export class RouteConstants {
    // USER MODULE 
    public static readonly USER: string = '/user';
    public static readonly GET_USER_BY_ID: string = '/:id';
    public static readonly UPDATE_USER_BY_ID: string = '/:id';
    public static readonly DELETE_USER_BY_ID: string = '/:id';
    public static readonly GET_ALL_USERS: string = '/';
    public static readonly ADD_BALANCE_TO_USER: string = '/:id/addBal';

    // TOUR MODULE 
    public static readonly TOUR: string = '/tour';
    public static readonly ADD_TOUR: string = '/';
    public static readonly GET_TOUR_BY_ID: string = '/:id';
    public static readonly UPDATE_TOUR_BY_ID: string = '/:id';
    public static readonly DELETE_TOUR_BY_ID: string = '/:id';
    public static readonly GET_ALL_TOURS: string = '/';

    // AUTH MODULE 
    public static readonly AUTH: string = '/auth';
    public static readonly REGISTER: string = '/register';
    public static readonly LOGIN: string = '/login';

    // ACTIVITY MODULE
    public static readonly ACTIVITY: string = '/activity';
    public static readonly ADD_ACTIVITY: string = '/';
    public static readonly GET_ACTIVITY_BY_ID: string = '/:id';
    public static readonly UPDATE_ACTIVITY_BY_ID: string = '/:id';
    public static readonly DELETE_ACTIVITY_BY_ID: string = '/:id';
    public static readonly GET_ALL_ACTIVITIES: string = '/';

    // BOOKING MODULE
    public static readonly BOOKING: string = '/booking';
    public static readonly ADD_BOOKING: string = '/';
    public static readonly GET_BOOKING_BY_ID: string = '/:id';
    public static readonly GET_BOOKINGS_FOR_USER: string = '/user/:id';
    public static readonly DELETE_BOOKING_BY_ID: string = '/:id';
    public static readonly GET_ALL_BOOKINGS: string = '/';

    // DESTINATION MODULE
    public static readonly DESTINATION: string = '/destination';
    public static readonly ADD_DESTINATION: string = '/';
    public static readonly GET_DESTINATION_BY_ID: string = '/:id';
    public static readonly UPDATE_DESTINATION_BY_ID: string = '/:id';
    public static readonly DELETE_DESTINATION_BY_ID: string = '/:id';
    public static readonly GET_ALL_DESTINATIONS: string = '/';
    public static readonly GET_ALL_DESTINATIONS_WITHOUT_PAGINATION: string = '/all';
    public static readonly GET_ALL_TOURS_WITH_DEST_IDS: string = '/tours';

    // ANALYTICS MODULE 
    public static readonly ANALYTICS: string = '/analytics';
    public static readonly GET_COUNT: string = '/count';
}