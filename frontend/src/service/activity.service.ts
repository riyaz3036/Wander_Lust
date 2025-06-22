import { ApiConstants } from "../constants/ApiConstants";
import { Activity, AddActivityRequest, UpdateActivityRequest } from "../types/activity.types";
import { SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "../types/response.types";
import getAxiosInstance from "./axios.service";

export const fetchActivitiesWIthPagination = ( page: number, size: number): Promise<SuccessPaginatedResponse<Activity[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.ACTIVITY.GET_ALL(page, size), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchAtivity = (id: string): Promise<SuccessResponse<Activity>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.ACTIVITY.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const addActivity = (payload: AddActivityRequest): Promise<SuccessResponse<Activity>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(
            ApiConstants.ACTIVITY.ADD(), {...payload}, { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => reject(err));
    });

export const editActivity = (id: string, payload: UpdateActivityRequest): Promise<SuccessResponse<Activity>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().patch(
            ApiConstants.ACTIVITY.UPDATE_BY_ID(id), {...payload}, { withCredentials: true }
        )
        .then((response) => {
            resolve(response?.data);
        })
        .catch((err) => {
            reject(err);
        });
    });

export const deleteActivity = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.ACTIVITY.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err);
            });
    });

const ActivityService = {
    fetchActivitiesWIthPagination,
    fetchAtivity,
    addActivity,
    editActivity,
    deleteActivity
};

export default ActivityService;
