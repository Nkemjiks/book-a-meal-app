import {
  GET_ALL_MENU_SUCCESS,
  GET_ALL_MENU_FAILURE,
} from '../actionTypes';

export const initialState = {
  allMenu: [],
  error: null,
};

export const getAllMenuSuccessAction = {
  type: GET_ALL_MENU_SUCCESS,
  payload: {
    data: [],
  },
};
export const getAllMenuSuccessState = {
  allMenu: {
    data: [],
  },
  error: null,
};
export const getAllMenuFailureAction = {
  type: GET_ALL_MENU_FAILURE,
  payload: 'The menu for today has not been set',
};
export const getAllMenuFailureState = {
  allMenu: [],
  error: 'The menu for today has not been set',
};
