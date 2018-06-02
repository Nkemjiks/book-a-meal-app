import apiCall from '../helpers/axios';

const getCustomerOrderHistoryRequest = (userToken, action) => apiCall('/orders/customer', 'get', null, userToken)
  .then((response) => {
    action(response, true);
  })
  .catch((err) => {
    action(err.response.data.message, false);
  });

export default getCustomerOrderHistoryRequest;
