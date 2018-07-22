import { GET_ALL_MENU_SUCCESS, GET_ALL_MENU_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';

/**
* @returns {Promise}  - dispatches action with all menu set for the day
*/
const getAllMenuAction = offset => dispatch => axios.get(`/menu/${offset}`)
  .then((response) => {
    dispatch({
      type: GET_ALL_MENU_SUCCESS,
      payload: response.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_ALL_MENU_FAILURE,
      payload: err.response.data.message,
    });
  });

export default getAllMenuAction;
