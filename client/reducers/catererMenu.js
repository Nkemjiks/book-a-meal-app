import {
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_FAILURE,
} from '../actionTypes';

const initialState = {
  menu: {},
  error: null,
  menuCreated: false,
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
      };
    case GET_MENU_FAILURE:
      return {
        ...state,
        menu: {},
        error: action.payload,
        menuCreated: false,
      };
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        menu: {},
        error: null,
        menuCreated: action.payload,
      };
    case CREATE_MENU_FAILURE:
      return {
        ...state,
        menu: {},
        error: null,
        menuCreated: action.payload,
      };
    default:
      return state;
  }
};
