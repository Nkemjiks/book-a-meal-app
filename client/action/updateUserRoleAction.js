import { USER_ROLE_UPDATE_SUCCESS, USER_ROLE_UPDATE_FAILURE } from '../actionTypes';

const updateUserRoleAction = (userDetails, isAuthenticated) => {
  return (dispatch) => {
    if (isAuthenticated) {
      dispatch({
        type: USER_ROLE_UPDATE_SUCCESS,
        payload: userDetails,
      });
    } else {
      dispatch({
        type: USER_ROLE_UPDATE_FAILURE,
        payload: userDetails,
      });
    }
  };
};

export default updateUserRoleAction;
