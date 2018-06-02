import apiCall from '../helpers/axios';

const getAllCatererOrderRequest = (userToken, action) => apiCall('/orders/caterer/all', 'get', null, userToken)
  .then((response) => {
    action(response, true);
  })
  .catch((err) => {
    action(err.response.data.message, false);
  });

export default getAllCatererOrderRequest;
