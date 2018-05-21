import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../actionTypes';

const loginAction = () => {
  return (dispatch) => {
    if (window.localStorage.getItem('token')) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: true,
      });
    }
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: false,
    });
  };
};

export default loginAction;
