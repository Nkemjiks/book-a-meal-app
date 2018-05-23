import apiCall from '../helpers/axios';
import { SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE } from '../actionTypes';

const signupAction = (userDetail) => {
  return (dispatch) => {
    return apiCall('/auth/signup', 'post', userDetail)
      .then((response) => {
        window.localStorage.setItem('user', JSON.stringify(response.data.data));
        window.localStorage.setItem('token', response.data.token);
        dispatch({
          type: SIGNUP_USER_SUCCESS,
          payload: window.localStorage.getItem('user'),
        });
      })
      .catch((err) => {
        window.localStorage.setItem('error', err.response.data.message);
        dispatch({
          type: SIGNUP_USER_FAILURE,
          payload: window.localStorage.getItem('error'),
        });
      });
  };

};

export default signupAction;
