import api from './api';

const URL = 'control_tasks/'
class ControlTasksService {
    get_validate_correctness() {
        return api.get(URL+'validate_correctness/');
    }

}
export default new ControlTasksService();