import { SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE } from '../actionTypes';

const signupAction = (user, error) => {
  return (dispatch) => {
    if (user) {
      dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: user,
      });
    } else if (error) {
      dispatch({
        type: SIGNUP_USER_FAILURE,
        payload: error,
      });
    }
  };
};

export default signupAction;
