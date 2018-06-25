import { GET_USER_DETAILS_SUCCESS } from '../actionTypes';

/**
* @returns {Promise}  - dispatches action with user information
*/
const getUserDetailsAction = user => (dispatch) => {
  dispatch({
    type: GET_USER_DETAILS_SUCCESS,
    payload: user,
  });
};

export default getUserDetailsAction;
