import apiCall from '../helpers/axios';
import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../actionTypes';

const loginAction = (userDetail) => {
  return (dispatch) => {
    return apiCall('/auth/login', 'post', userDetail)
      .then((response) => {
        window.localStorage.setItem('user', JSON.stringify(response.data.data));
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.removeItem('error');
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: window.localStorage.getItem('user'),
        });
      })
      .catch((err) => {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        window.localStorage.setItem('error', err.response.data.message);
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: window.localStorage.getItem('error'),
        });
      });
  };
};

export default loginAction;
