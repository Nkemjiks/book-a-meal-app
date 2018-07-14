import { GET_MEALS_IN_MENU_SUCCESS, GET_MEALS_IN_MENU_FAILURE } from '../actionTypes';

const initialState = {
  mealsInMenu: [],
  error: null,
};

/**
 * Reducer that handles the meals in a particular caterer's menu for the customer
 *
 * @param {Object} state initial state for the getMealsInMenu section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the getMealsInMenu section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MEALS_IN_MENU_SUCCESS:
      return {
        ...state,
        mealsInMenu: action.payload,
        error: null,
      };
    case GET_MEALS_IN_MENU_FAILURE:
      return {
        ...state,
        mealsInMenu: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
