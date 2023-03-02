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
                console.log(response);                
                if (response.data.pass_exam === true) {
                    UserInfoService.updateValidateCorrectnessExamPass();
                }
                return response;
            });
        }

}
export default new ControlTasksService();