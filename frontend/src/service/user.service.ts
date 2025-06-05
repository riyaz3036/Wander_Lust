import { ApiConstants } from "../constants/ApiConstants";
import { SuccessMessageResponse, SuccessPaginatedResponse, SuccessResponse } from "../types/response.types";
import { UpdateUser, User } from "../types/user.types";
import getAxiosInstance from "./axios.service";

export const fetchUsersWithPagination = ( page: number, size: number): Promise<SuccessPaginatedResponse<User[]>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.USER.GET_ALL(page, size), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

export const fetchUser = (id: string): Promise<SuccessResponse<User>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.USER.GET_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });


export const editUser = (
    id: string,
    payload: UpdateUser,
    file?: File
  ): Promise<SuccessResponse<User>> =>
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
        .patch(ApiConstants.USER.UPDATE_BY_ID(id), data, {
          ...headers,
        })
        .then((response) => resolve(response?.data))
        .catch((err) => reject(err));
    });

export const deleteUser = (id: string): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().delete(ApiConstants.USER.DELETE_BY_ID(id), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => {
                reject(err);
            });
    });

const UserService = {
    fetchUsersWithPagination,
    fetchUser,
    editUser,
    deleteUser
};

export default UserService;
