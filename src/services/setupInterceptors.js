import axiosInstance from "./api";
import TokenService from "./token.service";
import AuthService from "./auth.service";
import EventBus from "@/common/EventBus";

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
      console.log("I'm interceptors error")
      const originalConfig = err.config;

      if (originalConfig.url !== "/token" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            AuthService.refresh().then((response) => {
                // refresh okay
                const user = response.data;
                store.dispatch('auth/refreshToken', user);
                return axiosInstance(originalConfig);
              },
              (error)=>{
                if(error.response.status === 401){
                  EventBus.dispatch("logout");
                }
              }
            )
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