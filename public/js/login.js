import axios         from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      // url: 'http://127.0.0.1:3000/api/v1/users/login',
      url: 'http://localhost:3000/api/v1/users/login',
      // url: 'localhost:3000/api/v1/users/login',
      // baseURL: 'localhost:3000/api/v1/users/login',
      // url: 'http://127.0.0.1:3000/api/v1/users/login',
      //
      data: {
        email: email,
        password: password
      }
    });
    
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successful');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    if ((
        res.data.status = 'success'
    )) {
      location.reload(true);
    }
  } catch (e) {
    showAlert('error', e.response.data.message, 'Error logging out! Try'
                                                + ' again.');
  }
};
