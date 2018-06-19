import { GET_CUSTOMER_ORDER_HISTORY_SUCCESS, GET_CUSTOMER_ORDER_HISTORY_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';

/**
* @returns {Promise}  - dispatches action with all orders that have been placed by the customer
*/
const getCustomerOrderHistoryAction = () => dispatch => apiCall('/orders/customer', 'get', null, getToken())
  .then((response) => {
    dispatch({
      type: GET_CUSTOMER_ORDER_HISTORY_SUCCESS,
      payload: response,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_CUSTOMER_ORDER_HISTORY_FAILURE,
      payload: err.response.data.message,
    });
  });

export default getCustomerOrderHistoryAction;
