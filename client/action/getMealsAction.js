import { GET_MEALS_SUCCESS, GET_MEALS_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';

/**
* @returns {Promise}  - dispatches action with caterer's meals
*/
const getMealsAction = () => dispatch => axios.get('/meals')
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

export default getMealsAction;
