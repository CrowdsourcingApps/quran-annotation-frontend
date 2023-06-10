import api from './api';
import UserInfoService from "./userinfo.service";

const URL = 'control_tasks/'
class ControlTasksService {
    get_validate_correctness() {
        return api.get(URL+'validate_correctness/');
    }

    save_validate_correctness_answers(answers){
        return api
            .post(URL+'validate_correctness/answers',answers)
            .then(response => {          
                if (response.data.pass_exam === true) {
                    UserInfoService.updateValidateCorrectnessExamPass();
                }
                return response;
            });
        }
    
    get_validate_correctness_user_accuracy() {
        return api.get(URL+'validate_correctness/user_accuracy');
    }

}
export default new ControlTasksService();