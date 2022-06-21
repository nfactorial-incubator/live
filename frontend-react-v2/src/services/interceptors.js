import {
  createTokenCookies,
  getRefreshToken,
  getToken,
  removeTokenCookies,
} from "../utils/tokenCookies";
import { api } from "./api";

let isRefreshing = false;
let failedRequestQueue = [];

export function setAuthorizationHeader(request, token) {
  request.headers.Authorization = `Bearer ${token}`;
}

function handleRefreshToken(refreshToken) {
  isRefreshing = true;

  api
    .post("/refresh", { refreshToken })
    .then((response) => {
      const { token } = response.data;

      createTokenCookies(token, response.data.refreshToken);
      setAuthorizationHeader(api.defaults, token);

      failedRequestQueue.forEach((request) => request.onSuccess(token));
      failedRequestQueue = [];
    })
    .catch((error) => {
      failedRequestQueue.forEach((request) => request.onFailure(error));
      failedRequestQueue = [];

      removeTokenCookies();
    })
    .finally(() => {
      isRefreshing = false;
    });
}

function onRequest(config) {
  const token = getToken();
  token && setAuthorizationHeader(config, token);
  return config;
}

function onRequestError(error) {
  return Promise.reject(error);
}

function onResponse(response) {
  return response;
}

function onResponseError(error) {
  if (error?.response?.status === 401) {
    if (error.response.data?.code === "token.expired") {
      const originalConfig = error.config;
      const refreshToken = getRefreshToken();

      !isRefreshing && handleRefreshToken(refreshToken);

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token) => {
            setAuthorizationHeader(originalConfig, token);
            resolve(api(originalConfig));
          },
          onFailure: (error) => {
            reject(error);
          },
        });
      });
    } else {
      removeTokenCookies();
    }
  }

  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
