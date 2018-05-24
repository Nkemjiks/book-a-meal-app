import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../actionTypes';

const loginAction = (userDetails, isAuthenticated) => {
  return (dispatch) => {
    if (isAuthenticated) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: userDetails,
      });
    } else {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: userDetails,
      });
    }
  };
};

export default loginAction;
