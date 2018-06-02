import apiCall from '../helpers/axios';

const getCatererOrderRequest = (userToken, action) => apiCall('/orders/caterer', 'get', null, userToken)
  .then((response) => {
    action(response, true);
  })
  .catch((err) => {
    action(err.response.data.message, false);
  });

export default getCatererOrderRequest;
