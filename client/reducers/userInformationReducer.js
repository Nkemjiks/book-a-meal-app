import { SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../actionTypes';

const initialState = {
  user: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        user: JSON.parse(action.payload),
        error: null,
      };
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        user: {},
        error: action.payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: JSON.parse(action.payload),
        error: null,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
