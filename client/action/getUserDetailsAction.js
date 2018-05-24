import { GET_USER_DETAILS_SUCCESS } from '../actionTypes';

const getUserDetailsAction = (user) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_DETAILS_SUCCESS,
      payload: user,
    });
  };
};

export default getUserDetailsAction;
