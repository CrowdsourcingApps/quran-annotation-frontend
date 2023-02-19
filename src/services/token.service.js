class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refresh_token;
    }
  
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.access_token;
    }
  
    updateLocalAccessToken(access_token, refresh_token) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.access_token = access_token;
      user.refresh_token = refresh_token;
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    removeUser() {
      localStorage.removeItem("user");
    }
}
  
export default new TokenService();