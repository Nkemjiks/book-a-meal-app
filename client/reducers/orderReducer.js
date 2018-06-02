import {
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  MODIFY_CUSTOMER_ORDER_SUCCESS,
  MODIFY_CUSTOMER_ORDER_FAILURE,
} from '../actionTypes';

const initialState = {
  isOrderPlaced: false,
  isOrderModified: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        isOrderPlaced: action.payload,
        isOrderModified: false,
      };
    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        isOrderPlaced: action.payload,
        isOrderModified: false,
      };
    case MODIFY_CUSTOMER_ORDER_SUCCESS:
      return {
        ...state,
        isOrderPlaced: false,
        isOrderModified: action.payload,
      };
    case MODIFY_CUSTOMER_ORDER_FAILURE:
      return {
        ...state,
        isOrderPlaced: false,
        isOrderModified: action.payload,
      };
    default:
      return state;
  }
};
