import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';

const getAllMenuRequest = (userToken, action) => {
  return apiCall('/menu/customer', 'get', null, userToken)
    .then((response) => {
      action(response.data.data, true);
    })
    .catch((err) => {
      action(err.response.data.message, false);
      return displayToast('error', err.response.data.message);
    });
};

export default getAllMenuRequest;
