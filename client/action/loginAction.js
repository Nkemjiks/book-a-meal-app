import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../actionTypes';
import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {object} userDetails - user details
* @param {array} history - browser history
*
* @returns {Promise}  - dispatches action with user information
*/
const loginAction = (userDetails, history) => (dispatch) => {
  apiCall('/auth/login', 'post', userDetails)
    .then((response) => {
      window.localStorage.setItem('@#$user', JSON.stringify(response.data.data));
      window.localStorage.setItem('@#$token', response.data.token);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data.data,
      });
      history.push('/customer/dashboard');
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: err.response.data.message,
      });
      return displayToast('error', err.response.data.message);
    });
};

export default loginAction;
