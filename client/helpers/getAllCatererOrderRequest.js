import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';

const getAllCatererOrderRequest = (userToken, action) => {
  return apiCall('/orders/caterer/all', 'get', null, userToken)
    .then((response) => {
      action(response, true);
    })
    .catch((err) => {
      action(err.response.data.message, false);
      return displayToast('error', err.response.data.message);
    });
};

export default getAllCatererOrderRequest;
