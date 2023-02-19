import axios from 'axios';
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'token', new URLSearchParams({
        username: user.email,
        password: user.password
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }))
      .then(response => {
        if (response.data.access_token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(user) {
    return axios
      .post(API_URL + 'register', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  refresh() {
    return axios.post(API_URL + 'token/refresh',null, {
        headers: { Authorization: 'Bearer ' + TokenService.getLocalRefreshToken() }
      }).then(response =>{
        const user = response.data
        if (user.access_token) {
          TokenService.updateLocalAccessToken(
            user.access_token,
            user.refresh_token
            );
        }
        return user;
      })
  }
}

export default new AuthService();