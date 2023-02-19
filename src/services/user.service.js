import api from './api';

class UserService {
    getme() {
        return api.get('me');
    }
}

export default new UserService();