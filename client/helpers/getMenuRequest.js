import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';

const getMenuRequest = (userToken, action) => {
  return apiCall('/menu/caterer', 'get', null, userToken)
    .then((response) => {
      action(response.data.data, true);
    })
    .catch((err) => {
      action(err.response.data.message, false);
      return displayToast('error', err.response.data.message);
    });
};

export default getMenuRequest;
