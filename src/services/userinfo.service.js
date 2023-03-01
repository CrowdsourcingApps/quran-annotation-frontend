class UserInfoService {
    getValidateCorrectnessResult() {
      const user_info = JSON.parse(localStorage.getItem("userInfo"));
      return user_info?.validate_correctness_exam_pass;
    }

    getVisitVCInstructions(){
        const user_info = JSON.parse(localStorage.getItem("userInfo"));
        return user_info?.vc_Instructions;
    }
  
    getValidateCorrectnessNO() {
      const user_info = JSON.parse(localStorage.getItem("userInfo"));
      return user_info?.validate_correctness_tasks_no;
    }
  
    updateVisitVCInstructions() {
      let user_info = JSON.parse(localStorage.getItem("userInfo"));
      user_info.vc_Instructions = true;
      localStorage.setItem("userInfo", JSON.stringify(user_info));
    }

    updateValidateCorrectnessExamPass(){
      let user_info = JSON.parse(localStorage.getItem("userInfo"));
      user_info.validate_correctness_exam_pass = true;
      localStorage.setItem("userInfo", JSON.stringify(user_info));
    }
  
    getUserInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
    }
  
    setUserInfo(user_info) {
      localStorage.setItem("userInfo", JSON.stringify(user_info));
    }
  
    removeUserInfo() {
      localStorage.removeItem("userInfo");
    }
}
  
export default new UserInfoService();