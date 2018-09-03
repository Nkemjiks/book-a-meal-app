import { GET_ALL_CATERER_ORDER_SUCCESS, GET_ALL_CATERER_ORDER_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';

/**
* @returns {Promise}  - dispatches action with all order that have been placed to the caterer
*/
const getAllCatererOrderAction = (offset, limit) => dispatch => axios.get(`/orders/caterer/all?limit=${limit}&offset=${offset}`)
  .then((response) => {
    dispatch({
      type: GET_ALL_CATERER_ORDER_SUCCESS,
      payload: response.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_ALL_CATERER_ORDER_FAILURE,
      payload: err.response.data.message,
    });
  });

export default getAllCatererOrderAction;
