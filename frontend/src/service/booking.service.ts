import { ApiConstants } from "../constants/ApiConstants";
import { Booking, CreateBooking } from "../types/booking.types";
import { SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "../types/response.types";
import getAxiosInstance from "./axios.service";

export const fetchBookingsWithPagination = ( page: number, size: number): Promise<SuccessPaginatedResponse<Booking[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.BOOKING.GET_ALL(page, size), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchBookingsForUserWithPagination = (id: string,  page: number, size: number): Promise<SuccessPaginatedResponse<Booking[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.BOOKING.GET_BY_USER(id, page, size), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchBooking = (id: string): Promise<SuccessResponse<Booking>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.BOOKING.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const addBooking = (payload: CreateBooking): Promise<SuccessResponse<Booking>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.BOOKING.ADD(), {...payload}, { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });


export const deleteBooking = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.BOOKING.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err);
            });
    });

const BookingService = {
    fetchBookingsWithPagination,
    fetchBookingsForUserWithPagination,
    fetchBooking,
    addBooking,
    deleteBooking
};

export default BookingService;
