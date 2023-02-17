import axios from 'axios';
import authHeader from './auth-header';
const { API_PREFIX, SERVER_PORT, USER_PATH } = require('../server-paths');

class UserService {
  getPublicContent() {
    return axios.get(API_PREFIX + SERVER_PORT + USER_PATH + 'all');
  }

  getUserBoard() {
    return axios.get(API_PREFIX + SERVER_PORT + USER_PATH + 'user', { headers: authHeader() }); 
  }

  getAdminBoard() {
   return axios.get(API_PREFIX + SERVER_PORT + USER_PATH + 'admin', { headers: authHeader() });
  }

  
  getCurrentUser() {
    return axios.get(
        API_PREFIX + SERVER_PORT + USER_PATH + 'username', 
        { headers: authHeader() }
    ).then(response => {
        return response.data;
    });
  }
}

let exp = new UserService();
export default exp;