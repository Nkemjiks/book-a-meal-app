import { LOGOUT_USER_SUCCESS } from '../actionTypes';

const logoutAction = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: true,
    });
  };
};

export default logoutAction;
