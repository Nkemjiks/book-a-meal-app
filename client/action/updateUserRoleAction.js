import { USER_ROLE_UPDATE_SUCCESS, USER_ROLE_UPDATE_FAILURE } from '../actionTypes';
import axios from '../helpers/axios';
import displayToast from '../helpers/displayToast';

/**
* @param {array} history - browser history
*
* @returns {Promise}  - dispatches action with user information
*/
const updateUserRoleAction = history => dispatch => axios.put('/auth/update')
  .then((response) => {
    window.localStorage.setItem('@#$user', JSON.stringify(response.data.data));
    window.localStorage.setItem('@#$token', response.data.token);
    dispatch({
      type: USER_ROLE_UPDATE_SUCCESS,
      payload: response.data.data,
    });
    history.push('/caterer/menu');
  })
  .catch((err) => {
    dispatch({
      type: USER_ROLE_UPDATE_FAILURE,
      payload: err.response.data.message,
    });
    return displayToast('error', err.response.data.message);
  });

export default updateUserRoleAction;
