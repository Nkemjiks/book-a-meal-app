import {
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_FAILURE,
} from '../actionTypes';

export const initialState = {
  menu: {},
  error: null,
  menuCreated: false,
};

export const getMenuSuccessAction = {
  type: GET_MENU_SUCCESS,
  payload: {
    data: [],
  },
};
export const getMenuSuccessState = {
  menu: {
    data: [],
  },
  error: null,
  menuCreated: false,
};
export const getMenuFailureAction = {
  type: GET_MENU_FAILURE,
  payload: 'You have not set the menu for today',
};
export const getMenuFailureState = {
  menu: {},
  error: 'You have not set the menu for today',
  menuCreated: false,
};

export const createMenuSucessAction = {
  type: CREATE_MENU_SUCCESS,
  payload: true,
};
export const createMenuSucessState = {
  error: null,
  menuCreated: true,
};
export const createMenuFailureAction = {
  type: CREATE_MENU_FAILURE,
  payload: false,
};
export const createMenuFailureState = {
  error: null,
  menuCreated: false,
};
