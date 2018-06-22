import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from '../actionTypes';
import axiosInstance, { config } from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {Object} orderDetails - order details
*
* @returns {Promise}  - dispatches action with true or false
*/
const placeOrderAction = orderDetails => dispatch => axiosInstance.post('/orders', orderDetails, config)
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

export default placeOrderAction;
