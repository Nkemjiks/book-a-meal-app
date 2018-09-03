import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {Object} orderDetails - order details
*
* @returns {Promise}  - dispatches action with true or false
*/
const placeOrderAction = orderDetails => dispatch => axios.post('/orders', orderDetails)
  .then((response) => {
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: true,
    });
    displayToast('success', 'Order Placed Successfully');
    return ({ response });
  })
  .catch((err) => {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      payload: false,
    });
    displayToast('error', err.response.data.message);
    return ({ err });
  });

export default placeOrderAction;
