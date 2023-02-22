import axios from 'axios';
import authHeader from './auth-header';
const { API_PREFIX, SERVER_PORT, USER_PATH, SUDOKU_PATH } = require('../server-paths');

class UserService {
  getPublicContent() {
    return axios.get(API_PREFIX + SERVER_PORT + USER_PATH + 'all');
  }

  getUserBoard() {
    return axios.get(API_PREFIX + SERVER_PORT + SUDOKU_PATH + 'all', { headers: authHeader() }); //TODO: make public
  }

  getAdminBoard() {
   return axios.get(API_PREFIX + SERVER_PORT + USER_PATH + 'admin', { headers: authHeader() });
  }

  getProfileBoard(user) {
    return axios.get(API_PREFIX + SERVER_PORT + USER_PATH + 'profile/' + user, { headers: authHeader() });
   }

   updateBio(bio) {
    let config = {
        headers: authHeader(),
        params: {
          bio: bio
        },
      }

      return axios
      .put(API_PREFIX + SERVER_PORT + USER_PATH + 'update/bio', null, {
          params: { bio: bio},
          headers: 
              authHeader(),
      }).then(
        response => console.log(response))
      .catch(err => console.warn(err));
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