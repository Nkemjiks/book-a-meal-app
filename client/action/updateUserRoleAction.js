import { USER_ROLE_UPDATE_SUCCESS, USER_ROLE_UPDATE_FAILURE } from '../actionTypes';

const updateUserRoleAction = (user, error) => {
  return (dispatch) => {
    if (user) {
      dispatch({
        type: USER_ROLE_UPDATE_SUCCESS,
        payload: user,
      });
    } else if (error) {
      dispatch({
        type: USER_ROLE_UPDATE_FAILURE,
        payload: error,
      });
    }
  };
};

export default updateUserRoleAction;
