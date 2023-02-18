import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'me', { headers: authHeader() });
    }
}

export default new UserService();