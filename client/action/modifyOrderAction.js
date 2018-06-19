import { MODIFY_ORDER_SUCCESS, MODIFY_ORDER_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';
import displayToast from '../helpers/displayToast';

/**
* @param {String} orderId - order id
* @param {Object} orderDetails - order details
* @param {Function} action - action to get orders
*
* @returns {Promise}  - dispatches action with true or false
*/
const modifyOrderAction = (orderId, orderDetails) => dispatch => apiCall(`/orders/${orderId}`, 'put', orderDetails, getToken())
  .then(() => {
    dispatch({
      type: MODIFY_ORDER_SUCCESS,
      payload: true,
    });
    displayToast('success', 'Order Modified Successfully');
  })
  .catch((err) => {
    dispatch({
      type: MODIFY_ORDER_FAILURE,
      payload: false,
    });
    displayToast('error', err.response.data.message);
  });

export default modifyOrderAction;
