import { GET_MEALS_IN_MENU_SUCCESS, GET_MEALS_IN_MENU_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';

/**
* @returns {Promise}  - dispatches action with all menu set for the day
*/
const getAllMenuAction = catererId => dispatch => axios.get(`/menu/meal/${catererId}`)
  .then((response) => {
    dispatch({
      type: GET_MEALS_IN_MENU_SUCCESS,
      payload: response.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_MEALS_IN_MENU_FAILURE,
      payload: err.response.data.message,
    });
  });

export default getAllMenuAction;
