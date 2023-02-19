import axiosInstance from "./api";
import TokenService from "./token.service";
import AuthService from "./auth.service";
import EventBus from "@/common/EventBus"

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/token" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const response = await AuthService.refresh()
            if (response.status === 200) {
                // refresh okay
                const user = response.data;
                store.dispatch('auth/refreshToken', user);
            }
            else {
                // refresh token expired
                EventBus.dispatch("logout");
            }

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;