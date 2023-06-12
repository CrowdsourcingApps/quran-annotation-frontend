import api from './api';

const URL = 'home/'

class HomeService{
    get_vc_statistics(){
        return api.get(URL+'statistics/validate_correctness');
    }
}

export default new HomeService();