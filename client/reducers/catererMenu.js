import {
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_FAILURE,
  REMOVE_MEAL_SUCCESS,
  REMOVE_MEAL_FAILURE,
} from '../actionTypes';

const initialState = {
  menu: {},
  error: null,
  menuCreated: false,
  mealRemoved: false,
};

/**
 * Reducer that handles caterer's menu
 *
 * @param {Object} state initial state for the getMenu section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the getMenu section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload,
        error: null,
        menuCreated: false,
        mealRemoved: false,
      };
    case GET_MENU_FAILURE:
      return {
        ...state,
        menu: {},
        error: action.payload,
        menuCreated: false,
        mealRemoved: false,
      };
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        error: null,
        menuCreated: action.payload,
        mealRemoved: false,
      };
    case CREATE_MENU_FAILURE:
      return {
        ...state,
        error: null,
        menuCreated: action.payload,
        mealRemoved: false,
      };
    case REMOVE_MEAL_SUCCESS:
      return {
        ...state,
        error: null,
        menuCreated: false,
        mealRemoved: action.payload,
      };
    case REMOVE_MEAL_FAILURE:
      return {
        ...state,
        error: null,
        menuCreated: false,
        mealRemoved: action.payload,
      };
    default:
      return state;
  }
};
