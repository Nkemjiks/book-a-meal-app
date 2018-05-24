import { LOGOUT_USER_SUCCESS } from '../actionTypes';

const initialState = {
  loggedOut: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loggedOut: action.payload,
      };
    default:
      return state;
  }
};
