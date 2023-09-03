import axios from 'axios';
import api from './api';

const API_URL = import.meta.env.VITE_API_URL;

class NotificationService {

  store_token(token) {
    return api.post(API_URL + 'notifications/store_token', {
        token: token,
        platform: 'web'
      });
  }
}

export default new NotificationService();