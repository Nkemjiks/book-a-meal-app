import { GET_CUSTOMER_ORDER_HISTORY_SUCCESS, GET_CUSTOMER_ORDER_HISTORY_FAILURE } from '../actionTypes';

const initialState = {
  customerOrderHistory: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        customerOrderHistory: action.payload,
        error: null,
      };
    case GET_CUSTOMER_ORDER_HISTORY_FAILURE:
      return {
        ...state,
        customerOrderHistory: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
