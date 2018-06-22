import { GET_CATERER_ORDER_SUCCESS, GET_CATERER_ORDER_FAILURE } from '../actionTypes';
import axiosInstance, { config } from '../helpers/axios';

/**
* @returns {Promise}  - dispatches action with the caterer's orders for that day
*/
const getCatererOrderAction = () => dispatch => axiosInstance.get('/orders/caterer', config)
  .then((response) => {
    dispatch({
      type: GET_CATERER_ORDER_SUCCESS,
      payload: response,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_CATERER_ORDER_FAILURE,
      payload: err.response.data.message,
    });
  });

export default getCatererOrderAction;
