import { GET_MENU_SUCCESS, GET_MENU_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';

/**
* @returns {Promise}  - dispatches action with menu set by the caterer
*/
const getMenuAction = () => (dispatch) => {
  apiCall('/menu/caterer', 'get', null, getToken())
    .then((response) => {
      dispatch({
        type: GET_MENU_SUCCESS,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_MENU_FAILURE,
        payload: err.response.data.message,
      });
    });
};

export default getMenuAction;
