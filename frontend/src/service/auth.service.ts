import { ApiConstants } from "../constants/ApiConstants";
import { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth.types";
import { SuccessMessageResponse, SuccessResponse } from "../types/response.types";
import getAxiosInstance from "./axios.service";

export const login = (payload: LoginRequest): Promise<SuccessResponse<LoginResponse>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(ApiConstants.AUTH.LOGIN(), {...payload})
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });


export const register = (payload: RegisterRequest): Promise<SuccessMessageResponse> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().post(ApiConstants.AUTH.REGISTER(), {...payload})
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const AuthService = {
    login,
    register
};

export default AuthService;
