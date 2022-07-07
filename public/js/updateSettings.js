import axios         from 'axios'
import { showAlert } from './alert';

export const updateDate = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateMe',
      data: {
        name: name,
        email: email
      }
    });
    
    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!')
    }
    
  } catch (e) {
    showAlert('error', e.response.data.message)
  }
};
