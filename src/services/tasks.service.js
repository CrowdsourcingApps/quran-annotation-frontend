import api from './api';

const URL = 'tasks/'
class TasksService {
    get_validate_correctness() {
        return api.get(URL+'validate_correctness/');
    }

    save_validate_correctness_answers(answers){
        return api
            .post(URL+'validate_correctness/answers',answers)
            .then(response => {
                console.log(response);                
                return response;
            });
        }
    get_today_vc_contribution(){
        return api.get(URL+'validate_correctness/today_contribution');
    }

}
export default new TasksService();