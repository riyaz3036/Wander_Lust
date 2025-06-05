import { ApiConstants } from "../constants/ApiConstants";
import { AddDestinationRequest, Destination, UpdateDestinationRequest } from "../types/destination.types";
import { SuccessArrayResponse, SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "../types/response.types";
import { Tour } from "../types/tour.types";
import getAxiosInstance from "./axios.service";

export const fetchDestinationsWithPagination = ( page: number, size: number): Promise<SuccessPaginatedResponse<Destination[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.DESTINATION.GET_ALL(page, size), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });


export const fetchDestinations = (): Promise<SuccessArrayResponse<Destination[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.DESTINATION.GET_ALL_WITHOUT_PAGINATION(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchToursByDestinationIds = (page: number, size: number, payload: Record<string, string[]>): Promise<SuccessPaginatedResponse<Tour[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance()
       .post(
        ApiConstants.DESTINATION.GET_ALL_TOURS_BY_DEST_IDS(page, size),
        payload, 
        { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });


export const fetchDestination = (id: string): Promise<SuccessResponse<Destination>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.DESTINATION.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const addDestination = (payload: AddDestinationRequest, file?: File): Promise<SuccessResponse<Destination>> =>
    new Promise((resolve, reject) => {
        let data: any;
        let headers: any = {
          withCredentials: true,
        };

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            Object.entries(payload).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                formData.append(key, String(value));
              }
            });
            data = formData;
            headers['Content-Type'] = 'multipart/form-data';
        } else 
            data = payload; 

      getAxiosInstance()
        .post(ApiConstants.DESTINATION.ADD(), data, {
          ...headers,
        })
        .then((response) => resolve(response?.data))
        .catch((err) => reject(err));
    });


    export const editDestination = (
        id: string,
        payload: UpdateDestinationRequest,
        file?: File
    ): Promise<SuccessResponse<Destination>> =>
        new Promise((resolve, reject) => {
        let data: any;
        let headers: any = {
            withCredentials: true,
        };

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            Object.entries(payload).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                formData.append(key, String(value));
                }
            });
            data = formData;
            headers['Content-Type'] = 'multipart/form-data';
        } else 
            data = payload; 

        getAxiosInstance()
            .patch(ApiConstants.DESTINATION.UPDATE_BY_ID(id), data, {
            ...headers,
            })
            .then((response) => resolve(response?.data))
            .catch((err) => reject(err));
        });

export const deleteDestination = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.DESTINATION.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err);
            });
    });

const DestinationService = {
    fetchDestinationsWithPagination,
    fetchDestination,
    fetchDestinations,
    addDestination,
    editDestination,
    deleteDestination,
    fetchToursByDestinationIds
};

export default DestinationService;
