import { SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE } from '../actionTypes';

const signupAction = (userDetails, isAuthenticated) => {
  return (dispatch) => {
    if (isAuthenticated) {
      dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: userDetails,
      });
    } else {
      dispatch({
        type: SIGNUP_USER_FAILURE,
        payload: userDetails,
      });
    }
  };
};

export default signupAction;
