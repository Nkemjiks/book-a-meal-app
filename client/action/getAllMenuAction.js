import { GET_ALL_MENU_SUCCESS, GET_ALL_MENU_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';

/**
* @returns {Promise}  - dispatches action with all menu set for the day
*/
const getMenuAction = () => dispatch => apiCall('/menu/customer', 'get', null, getToken())
  .then((response) => {
    dispatch({
      type: GET_ALL_MENU_SUCCESS,
      payload: response.data.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_ALL_MENU_FAILURE,
      payload: err.response.data.message,
    });
  });

export default getMenuAction;
