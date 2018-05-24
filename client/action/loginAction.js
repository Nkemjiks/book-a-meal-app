import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../actionTypes';

const loginAction = (user, error) => {
  return (dispatch) => {
    if (user) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user,
      });
    } else if (error) {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error,
      });
    }
  };
};

export default loginAction;
