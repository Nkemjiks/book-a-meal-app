import { CREATE_MENU_SUCCESS, CREATE_MENU_FAILURE } from '../actionTypes';
import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';
import getToken from '../helpers/getToken';

/**
* @param {Object} meals - ids of meal
* @param {Function} action - action to get menu
*
* @returns {Promise}  - dispatches action with true or false
*/
const createMenuAction = (meals, action) => (dispatch) => {
  apiCall('/menu', 'post', meals, getToken())
    .then((response) => {
      dispatch({
        type: CREATE_MENU_SUCCESS,
        payload: true,
      });
      action();
      displayToast('success', response.data.message);
    })
    .catch((err) => {
      dispatch({
        type: CREATE_MENU_FAILURE,
        payload: false,
      });
      displayToast('error', err.response.data.message);
    });
};

export default createMenuAction;
