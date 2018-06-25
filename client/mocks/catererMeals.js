import {
  GET_MEALS_SUCCESS,
  GET_MEALS_FAILURE,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  MODIFY_MEAL_SUCCESS,
  MODIFY_MEAL_FAILURE,
  DELETE_MEAL_SUCCESS,
  DELETE_MEAL_FAILURE,
} from '../actionTypes';

export const initialState = {
  meals: [],
  error: null,
  mealAdded: false,
  mealModified: false,
  mealDeleted: false,
};

export const getMealSuccessAction = {
  type: GET_MEALS_SUCCESS,
  payload: {
    data: [],
  },
};
export const getMealSuccessState = {
  meals: {
    data: [],
  },
  error: null,
  mealAdded: false,
  mealModified: false,
  mealDeleted: false,
};

export const getMealFailureAction = {
  type: GET_MEALS_FAILURE,
  payload: 'You have not added any meal',
};
export const getMealFailureState = {
  meals: [],
  error: 'You have not added any meal',
  mealAdded: false,
  mealModified: false,
  mealDeleted: false,
};

export const mealAddedSucessAction = {
  type: ADD_MEAL_SUCCESS,
  payload: true,
};
export const mealAddedSucessState = {
  error: null,
  mealAdded: true,
  mealModified: false,
  mealDeleted: false,
};
export const mealAddedFailureAction = {
  type: ADD_MEAL_FAILURE,
  payload: false,
};
export const mealAddedFailureState = {
  error: null,
  mealAdded: false,
  mealModified: false,
  mealDeleted: false,
};

export const mealModifiedSucessAction = {
  type: MODIFY_MEAL_SUCCESS,
  payload: true,
};
export const mealModifiedSucessState = {
  error: null,
  mealAdded: false,
  mealModified: true,
  mealDeleted: false,
};
export const mealModifiedFailureAction = {
  type: MODIFY_MEAL_FAILURE,
  payload: false,
};
export const mealModifiedFailureState = {
  error: null,
  mealAdded: false,
  mealModified: false,
  mealDeleted: false,
};

export const mealDeletedSucessAction = {
  type: DELETE_MEAL_SUCCESS,
  payload: true,
};
export const mealDeletedSucessState = {
  error: null,
  mealAdded: false,
  mealModified: false,
  mealDeleted: true,
};
export const mealDeletedFailureAction = {
  type: DELETE_MEAL_FAILURE,
  payload: false,
};
export const mealDeletedFailureState = {
  error: null,
  mealAdded: false,
  mealModified: false,
  mealDeleted: false,
};
