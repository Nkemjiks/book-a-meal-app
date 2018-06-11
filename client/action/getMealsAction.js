import { GET_MEALS_SUCCESS, GET_MEALS_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';

/**
* @returns {Promise}  - dispatches action with caterer's meals
*/
const getMealsAction = () => (dispatch) => {
  apiCall('/meals', 'get', null, getToken())
    .then((response) => {
      dispatch({
        type: GET_MEALS_SUCCESS,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_MEALS_FAILURE,
        payload: err.response.data.message,
      });
    });
};

export default getMealsAction;
