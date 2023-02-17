import axios from 'axios';
const { API_PREFIX, SERVER_PORT, AUTH_PATH } = require('../server-paths');

class AuthService {
  login(username, password) {
    return axios
      .post(API_PREFIX + SERVER_PORT + AUTH_PATH + "authenticate", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          console.log(response);
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        return response.data;
      });
  }

  logout() {
    console.log("Loggin out");
    localStorage.removeItem("token");
  }

  register(username, email, password) {
    console.log("Going to register");
    return axios.post(API_PREFIX + SERVER_PORT + AUTH_PATH + "register", {
      username,
      email,
      password
    });
  }
}

let exp = new AuthService();
export default exp;