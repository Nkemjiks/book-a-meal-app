import { GET_CATERER_ORDER_SUCCESS, GET_CATERER_ORDER_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';

/**
* @returns {Promise}  - dispatches action with the caterer's orders for that day
*/
const getCatererOrderAction = () => dispatch => apiCall('/orders/caterer', 'get', null, getToken())
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
