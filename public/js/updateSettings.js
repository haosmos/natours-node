import axios         from 'axios'
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url = type === 'password'
                ? 'http://localhost:3000/api/v1/users/updateMyPassword'
                : 'http://localhost:3000/api/v1/users/updateMe'
    
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} Data updated successfully!`)
    }
    
    setTimeout(() => {
      location.reload();
    }, 900)
    
  } catch (e) {
    showAlert('error', e.response.data.message)
  }
};