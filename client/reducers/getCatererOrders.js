import { GET_CATERER_ORDER_SUCCESS, GET_CATERER_ORDER_FAILURE } from '../actionTypes';

const initialState = {
  orders: {},
  error: null,
};

/**
 * Reducer that handles caterer order for that day
 *
 * @param {Object} state initial state for the getCatererOrders section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the getCatererOrders section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATERER_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        error: null,
      };
    case GET_CATERER_ORDER_FAILURE:
      return {
        ...state,
        orders: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
