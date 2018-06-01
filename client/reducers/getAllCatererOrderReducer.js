import { GET_ALL_CATERER_ORDER_SUCCESS, GET_ALL_CATERER_ORDER_FAILURE } from '../actionTypes';

const initialState = {
  allOrders: {},
  error: null,
};

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
