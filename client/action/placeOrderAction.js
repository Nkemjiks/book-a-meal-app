import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';
import getToken from '../helpers/getToken';

/**
* @param {Object} orderDetails - order details
*
* @returns {Promise}  - dispatches action with true or false
*/
const placeOrderAction = orderDetails => (dispatch) => {
  apiCall('/orders', 'post', orderDetails, getToken())
    .then(() => {
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: true,
      });
      displayToast('success', 'Order Placed Successfully');
    })
    .catch((err) => {
      dispatch({
        type: PLACE_ORDER_FAILURE,
        payload: false,
      });
      displayToast('error', err.response.data.message);
    });
};

export default placeOrderAction;
