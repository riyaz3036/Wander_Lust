import { Activity } from "./activity.types";
import { Tour } from "./tour.types";
import { User } from "./user.types";

export interface Booking {
    id: string;
    user: User;
    tour: Tour;
    signed_activities: Activity[];
    price: number;
    bookFor: string;
    guestSize: number;
}

export interface CreateBooking {
    user_id: string;
    tour_id: string;
    signed_activities: string[];
    price: number;
    bookFor: string;
    guestSize: number;
}