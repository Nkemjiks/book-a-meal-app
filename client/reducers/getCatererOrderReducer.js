import { GET_CATERER_ORDER_SUCCESS, GET_CATERER_ORDER_FAILURE } from '../actionTypes';

const initialState = {
  orders: {},
  error: null,
};

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
