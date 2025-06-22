export const ApiConstants = {
    // AUTH ENDPOINTS
    AUTH: {
        BASE: '/auth',
        REGISTER: () => `${ApiConstants.AUTH.BASE}/register`,
        LOGIN: () => `${ApiConstants.AUTH.BASE}/login`,
    },

    // USER ENDPOINTS
    USER: {
        BASE: '/user',
        GET_ALL: (page: number, size: number) => `${ApiConstants.USER.BASE}?page=${page}&size=${size}`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.USER.BASE}/${id}`,
        UPDATE_BY_ID: (id: string | number) => `${ApiConstants.USER.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.USER.BASE}/${id}`,
    },

    // TOUR ENDPOINTS
    TOUR: {
        BASE: '/tour',
        GET_ALL: (page: number, size: number) => `${ApiConstants.TOUR.BASE}?page=${page}&size=${size}`,
        ADD: () => `${ApiConstants.TOUR.BASE}`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.TOUR.BASE}/${id}`,
        UPDATE_BY_ID: (id: string | number) => `${ApiConstants.TOUR.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.TOUR.BASE}/${id}`,
    },

    // ACTIVITY ENDPOINTS
    ACTIVITY: {
        BASE: '/activity',
        GET_ALL: (page: number, size: number) => `${ApiConstants.ACTIVITY.BASE}?page=${page}&size=${size}`,
        ADD: () => `${ApiConstants.ACTIVITY.BASE}`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.ACTIVITY.BASE}/${id}`,
        UPDATE_BY_ID: (id: string | number) => `${ApiConstants.ACTIVITY.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.ACTIVITY.BASE}/${id}`,
    },

    // BOOKING ENDPOINTS
    BOOKING: {
        BASE: '/booking',
        GET_ALL: (page: number, size: number) => `${ApiConstants.BOOKING.BASE}?page=${page}&size=${size}`,
        ADD: () => `${ApiConstants.BOOKING.BASE}`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.BOOKING.BASE}/${id}`,
        GET_BY_USER: (userId: string, page: number, size: number) => `${ApiConstants.BOOKING.BASE}/user/${userId}?page=${page}&size=${size}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.BOOKING.BASE}/${id}`,
    },

    // DESTINATION ENDPOINTS
    DESTINATION: {
        BASE: '/destination',
        GET_ALL: (page: number, size: number) => `${ApiConstants.DESTINATION.BASE}?page=${page}&size=${size}`,
        GET_ALL_TOURS_BY_DEST_IDS: (page: number, size: number) => `${ApiConstants.DESTINATION.BASE}/tours?page=${page}&size=${size}`,
        GET_ALL_WITHOUT_PAGINATION: () => `${ApiConstants.DESTINATION.BASE}/all`,
        ADD: () => `${ApiConstants.DESTINATION.BASE}`,
        GET_BY_ID: (id: string | number) => `${ApiConstants.DESTINATION.BASE}/${id}`,
        UPDATE_BY_ID: (id: string | number) => `${ApiConstants.DESTINATION.BASE}/${id}`,
        DELETE_BY_ID: (id: string | number) => `${ApiConstants.DESTINATION.BASE}/${id}`,
    },

    // ANALYTICS ENDPOINTS
    ANALYTICS: {
        BASE: '/analytics',
        GET_COUNT: () => `${ApiConstants.ANALYTICS.BASE}/count`,
    },
};
