import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  USER_ROLE_UPDATE_SUCCESS,
  USER_ROLE_UPDATE_FAILURE,
} from '../actionTypes';

export const initialState = {
  user: {},
  error: null,
};

export const signupSuccessAction = {
  type: SIGNUP_USER_SUCCESS,
  payload: {
    data: [],
  },
};
export const signupSuccessState = {
  user: {
    data: [],
  },
  error: null,
};
export const signupFailureAction = {
  type: SIGNUP_USER_FAILURE,
  payload: 'Incorrect email address',
};
export const signupFailureState = {
  user: {},
  error: 'Incorrect email address',
};

export const loginSuccessAction = {
  type: LOGIN_USER_SUCCESS,
  payload: {
    data: [],
  },
};
export const loginSuccessState = {
  user: {
    data: [],
  },
  error: null,
};
export const loginFailureAction = {
  type: LOGIN_USER_FAILURE,
  payload: 'Incorrect Address',
};
export const loginFailureState = {
  user: {},
  error: 'Incorrect Address',
};

export const roleUpdateSuccessAction = {
  type: USER_ROLE_UPDATE_SUCCESS,
  payload: {
    data: [],
  },
};
export const roleUpdateSuccessState = {
  user: {
    data: [],
  },
  error: null,
};
export const roleUpdateFailureAction = {
  type: USER_ROLE_UPDATE_FAILURE,
  payload: 'Invalid Token',
};
export const roleUpdateFailureState = {
  user: {},
  error: 'Invalid Token',
};

export const userInformationAction = {
  type: GET_USER_DETAILS_SUCCESS,
  payload: {
    data: [],
  },
};
export const userInformationState = {
  user: {
    data: [],
  },
  error: null,
};

