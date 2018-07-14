import {
  GET_MEALS_IN_MENU_SUCCESS,
  GET_MEALS_IN_MENU_FAILURE,
} from '../actionTypes';

export const initialState = {
  mealsInMenu: [],
  error: null,
};

export const getMealsInMenuSuccessAction = {
  type: GET_MEALS_IN_MENU_SUCCESS,
  payload: {
    data: [],
  },
};
export const getMealsInMenuSuccessState = {
  mealsInMenu: {
    data: [],
  },
  error: null,
};
export const getMealsInMenuFailureAction = {
  type: GET_MEALS_IN_MENU_FAILURE,
  payload: 'There is no meal in the menu',
};
export const getMealsInMenuFailureState = {
  mealsInMenu: [],
  error: 'There is no meal in the menu',
};
