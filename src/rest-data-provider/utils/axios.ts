import { HttpError } from "@refinedev/core";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create();

// Add an Axios interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    // Add the token to the request headers
    if (token) {
      // Make sure config.headers is not undefined by providing a default empty object
      config.headers = { ...config.headers, Authorization: `${token}` };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
