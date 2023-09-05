import axios from 'axios';
import TokenService from "./token.service";
import UserInfoService from "./userinfo.service";
import api from './api';

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  login(user, anonymous_id) {
    var url;
    if(anonymous_id)
      url = `${API_URL}token?anonymous_id=${anonymous_id}`;
    else
      url = `${API_URL}token`;
    return axios
      .post(url, new URLSearchParams({
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
    UserInfoService.removeUserInfo();
  }

  register(user, anonymous_id) {
    var url;
    if(anonymous_id)
      url = `${API_URL}register?anonymous_id=${anonymous_id}`;
    else
      url = `${API_URL}register`;
    return axios
      .post(url, {
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

  register_anonymous() {
    return axios
      .post(API_URL + 'register_anonumous')
      .then(response => {
        if(response.data.anonymous_id){
          localStorage.setItem("anonymous_id",response.data.anonymous_id)
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
        return response;
      })
  }

  getme() {
    return api.get('me');
  }

  sendmessage(message) {
    return axios
      .post(API_URL + 'sendmail', {
        email: message.email,
        name: message.name,
        message: message.message
      })
      .then(response => {
        return response.data;
      });
  }
}

export default new AuthService();