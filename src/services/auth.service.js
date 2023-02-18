import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  login(user) {
    console.log('API_URL'+ API_URL)
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
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios
      .post(API_URL + 'register', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new AuthService();