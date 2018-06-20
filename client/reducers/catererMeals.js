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

const initialState = {
  meals: [],
  error: null,
  mealAdded: false,
  mealModified: false,
  mealDeleted: false,
};

/**
 * Reducer that handles caterer meals
 *
 * @param {Object} state initial state for the meals section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the meals section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MEALS_SUCCESS:
      return {
        ...state,
        meals: action.payload,
        error: null,
        mealAdded: false,
        mealModified: false,
        mealDeleted: false,
      };
    case GET_MEALS_FAILURE:
      return {
        ...state,
        meals: [],
        error: action.payload,
        mealAdded: false,
        mealModified: false,
        mealDeleted: false,
      };
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        error: null,
        mealAdded: action.payload,
        mealModified: false,
        mealDeleted: false,
      };
    case ADD_MEAL_FAILURE:
      return {
        ...state,
        error: null,
        mealAdded: action.payload,
        mealModified: false,
        mealDeleted: false,
      };
    case MODIFY_MEAL_SUCCESS:
      return {
        ...state,
        error: null,
        mealAdded: false,
        mealModified: action.payload,
        mealDeleted: false,
      };
    case MODIFY_MEAL_FAILURE:
      return {
        ...state,
        error: null,
        mealAdded: false,
        mealModified: action.payload,
        mealDeleted: false,
      };
    case DELETE_MEAL_SUCCESS:
      return {
        ...state,
        error: null,
        mealAdded: false,
        mealModified: false,
        mealDeleted: action.payload,
      };
    case DELETE_MEAL_FAILURE:
      return {
        ...state,
        error: null,
        mealAdded: false,
        mealModified: false,
        mealDeleted: action.payload,
      };
    default:
      return state;
  }
};
