import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';

const getCatererOrderRequest = (userToken, action) => {
  return apiCall('/orders/caterer', 'get', null, userToken)
    .then((response) => {
      action(response, true);
    })
    .catch((err) => {
      action(err.response.data.message, false);
      return displayToast('error', err.response.data.message);
    });
};

export default getCatererOrderRequest;
