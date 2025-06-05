import { ApiConstants } from "../constants/ApiConstants";
import { AnalyticsCount } from "../types/analytics.types";
import { SuccessResponse } from "../types/response.types";
import getAxiosInstance from "./axios.service";

export const getCount = (): Promise<SuccessResponse<AnalyticsCount>> =>
    new Promise((resolve, reject) => {
        getAxiosInstance().get(ApiConstants.ANALYTICS.GET_COUNT(), { withCredentials: true })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((err) => reject(err));
    });

const AnalyticsService = {
    getCount
};

export default AnalyticsService;
