import {
  GET_CUSTOMER_ORDER_HISTORY_SUCCESS,
  GET_CUSTOMER_ORDER_HISTORY_FAILURE,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  MODIFY_ORDER_SUCCESS,
  MODIFY_ORDER_FAILURE,
} from '../actionTypes';

const initialState = {
  customerOrderHistory: {},
  error: null,
  orderPlaced: false,
  orderModified: false,
};

/**
 * Reducer that handles customer order
 *
 * @param {Object} state initial state for the customerOrder section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the customerOrder section of the store
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        customerOrderHistory: action.payload,
        error: null,
        orderPlaced: false,
        orderModified: false,
      };
    case GET_CUSTOMER_ORDER_HISTORY_FAILURE:
      return {
        ...state,
        customerOrderHistory: {},
        error: action.payload,
        orderPlaced: false,
        orderModified: false,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        customerOrderHistory: {},
        error: null,
        orderPlaced: action.payload,
        orderModified: false,
      };
    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        customerOrderHistory: {},
        error: null,
        orderPlaced: action.payload,
        orderModified: false,
      };
    case MODIFY_ORDER_SUCCESS:
      return {
        ...state,
        customerOrderHistory: {},
        error: null,
        orderPlaced: false,
        orderModified: action.payload,
      };
    case MODIFY_ORDER_FAILURE:
      return {
        ...state,
        customerOrderHistory: {},
        error: null,
        orderPlaced: false,
        orderModified: action.payload,
      };
    default:
      return state;
  }
};
