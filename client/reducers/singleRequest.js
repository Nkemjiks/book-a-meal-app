import {
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  MODIFY_ORDER_SUCCESS,
  MODIFY_ORDER_FAILURE,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_FAILURE,
  MODIFY_MEAL_SUCCESS,
  MODIFY_MEAL_FAILURE,
  DELETE_MEAL_SUCCESS,
  DELETE_MEAL_FAILURE,
} from '../actionTypes';

const initialState = {
  orderPlaced: false,
  mealAdded: false,
  orderModified: false,
  menuCreated: false,
  mealModified: false,
  mealDeleted: false,
};

/**
 * Reducer that handles single requests
 *(place order, add meal, modify order, create menu, modify meal, delete meal)
 *
 * @param {Object} state initial state for the singleRequest section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the singleRequest section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        orderPlaced: action.payload,
        mealAdded: false,
        orderModified: false,
        menuCreated: false,
        mealModified: false,
        mealDeleted: false,
      };
    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        orderPlaced: action.payload,
        mealAdded: false,
        orderModified: false,
        menuCreated: false,
        mealModified: false,
        mealDeleted: false,
      };
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: action.payload,
        orderModified: false,
        menuCreated: false,
        mealModified: false,
        mealDeleted: false,
      };
    case ADD_MEAL_FAILURE:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: action.payload,
        orderModified: false,
        menuCreated: false,
        mealModified: false,
        mealDeleted: false,
      };
    case MODIFY_ORDER_SUCCESS:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: false,
        orderModified: action.payload,
        menuCreated: false,
        mealModified: false,
        mealDeleted: false,
      };
    case MODIFY_ORDER_FAILURE:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: false,
        orderModified: action.payload,
        menuCreated: false,
        mealModified: false,
        mealDeleted: false,
      };
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: false,
        orderModified: false,
        menuCreated: action.payload,
        mealModified: false,
        mealDeleted: false,
      };
    case CREATE_MENU_FAILURE:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: false,
        orderModified: false,
        menuCreated: action.payload,
        mealModified: false,
        mealDeleted: false,
      };
    case MODIFY_MEAL_SUCCESS:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: false,
        orderModified: false,
        menuCreated: false,
        mealModified: action.payload,
        mealDeleted: false,
      };
    case MODIFY_MEAL_FAILURE:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: false,
        orderModified: false,
        menuCreated: false,
        mealModified: action.payload,
        mealDeleted: false,
      };
    case DELETE_MEAL_SUCCESS:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: false,
        orderModified: false,
        menuCreated: false,
        mealModified: false,
        mealDeleted: action.payload,
      };
    case DELETE_MEAL_FAILURE:
      return {
        ...state,
        orderPlaced: false,
        mealAdded: false,
        orderModified: false,
        menuCreated: false,
        mealModified: false,
        mealDeleted: action.payload,
      };
    default:
      return state;
  }
};
