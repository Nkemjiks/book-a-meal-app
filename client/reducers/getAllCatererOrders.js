import { GET_ALL_CATERER_ORDER_SUCCESS, GET_ALL_CATERER_ORDER_FAILURE } from '../actionTypes';

const initialState = {
  allOrders: {},
  error: null,
};

/**
 * Reducer that handles caterer order history
 *
 * @param {Object} state initial state for the getAllCatererOrder section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the getAllCatererOrder section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATERER_ORDER_SUCCESS:
      return {
        ...state,
        allOrders: action.payload,
        error: null,
      };
    case GET_ALL_CATERER_ORDER_FAILURE:
      return {
        ...state,
        allOrders: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
