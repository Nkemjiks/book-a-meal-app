import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  USER_ROLE_UPDATE_SUCCESS,
  USER_ROLE_UPDATE_FAILURE,
  LOGOUT_USER_SUCCESS
} from '../actionTypes';

const initialState = {
  user: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
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
        user: action.payload,
        error: null,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        user: {},
        error: action.payload,
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case USER_ROLE_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case USER_ROLE_UPDATE_FAILURE:
      return {
        ...state,
        user: {},
        error: action.payload,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: {},
        error: null,
      };
    default:
      return state;
  }
};
