import { SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {object} userDetails - user details
* @param {array} history - browser history
*
* @returns {Promise}  - dispatches action with user information
*/
const signupAction = (userDetails, history) => dispatch => axios.post('/auth/signup', userDetails)
  .then((response) => {
    window.localStorage.setItem('@#$user', JSON.stringify(response.data.data));
    window.localStorage.setItem('@#$token', response.data.token);
    dispatch({
      type: SIGNUP_USER_SUCCESS,
      payload: response.data.data,
    });
    history.push('/customer/dashboard/0');
  })
  .catch((err) => {
    dispatch({
      type: SIGNUP_USER_FAILURE,
      payload: err.response.data.message,
    });
    return displayToast('error', err.response.data.message);
  });

export default signupAction;
