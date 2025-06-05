import { ApiConstants } from "../constants/ApiConstants";
import { SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "../types/response.types";
import { AddTourRequest, Tour, UpdateTourRequest  } from "../types/tour.types";
import getAxiosInstance from "./axios.service";

export const fetchTourWithPagination = ( page: number, size: number): Promise<SuccessPaginatedResponse<Tour[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.TOUR.GET_ALL(page, size), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchTour = (id: string): Promise<SuccessResponse<Tour>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.TOUR.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const addTour = (payload: AddTourRequest, file?: File): Promise<SuccessResponse<Tour>> =>
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
        .post(ApiConstants.TOUR.ADD(), data, {
          ...headers,
        })
        .then((response) => resolve(response?.data))
        .catch((err) => reject(err));
    });

  export const editTour = (
    id: string,
    payload: UpdateTourRequest,
    file?: File
  ): Promise<SuccessResponse<Tour>> =>
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
        .patch(ApiConstants.TOUR.UPDATE_BY_ID(id), data, {
          ...headers,
        })
        .then((response) => resolve(response?.data))
        .catch((err) => reject(err));
    });


export const deleteTour = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.TOUR.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err);
            });
    });

const TourService = {
    fetchTourWithPagination,
    fetchTour,
    addTour,
    editTour,
    deleteTour
};

export default TourService;
