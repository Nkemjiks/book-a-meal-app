import { GET_ALL_MENU_SUCCESS, GET_ALL_MENU_FAILURE } from '../actionTypes';

const initialState = {
  allMenu: [],
  error: null,
};

/**
 * Reducer that handles all menu for the customer
 *
 * @param {Object} state initial state for the getAllMenu section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the getAllMenu section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MENU_SUCCESS:
      return {
        ...state,
        allMenu: action.payload,
        error: null,
      };
    case GET_ALL_MENU_FAILURE:
      return {
        ...state,
        allMenu: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
