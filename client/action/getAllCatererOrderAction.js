import { GET_ALL_CATERER_ORDER_SUCCESS, GET_ALL_CATERER_ORDER_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';

/**
* @returns {Promise}  - dispatches action with all order that have been placed to the caterer
*/
const getAllCatererOrderAction = () => (dispatch) => {
  apiCall('/orders/caterer/all', 'get', null, getToken())
    .then((response) => {
      dispatch({
        type: GET_ALL_CATERER_ORDER_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_CATERER_ORDER_FAILURE,
        payload: err.response.data.message,
      });
    });
};

export default getAllCatererOrderAction;
