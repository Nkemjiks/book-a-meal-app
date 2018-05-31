import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from '../actionTypes';

const initialState = {
  isOrderPlaced: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        isOrderPlaced: action.payload,
      };
    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        isOrderPlaced: action.payload,
      };
    default:
      return state;
  }
};
