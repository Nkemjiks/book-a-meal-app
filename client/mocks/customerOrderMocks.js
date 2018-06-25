import {
  GET_CUSTOMER_ORDER_HISTORY_SUCCESS,
  GET_CUSTOMER_ORDER_HISTORY_FAILURE,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  MODIFY_ORDER_SUCCESS,
  MODIFY_ORDER_FAILURE,
} from '../actionTypes';

export const initialState = {
  customerOrderHistory: {},
  error: null,
  orderPlaced: false,
  orderModified: false,
};

export const getOrderSuccessAction = {
  type: GET_CUSTOMER_ORDER_HISTORY_SUCCESS,
  payload: {
    data: [],
  },
};
export const getOrderSuccessState = {
  customerOrderHistory: {
    data: [],
  },
  error: null,
  orderPlaced: false,
  orderModified: false,
};
export const getOrderFailureAction = {
  type: GET_CUSTOMER_ORDER_HISTORY_FAILURE,
  payload: 'You have not placed any order yet',
};
export const getOrderFailureState = {
  customerOrderHistory: {},
  error: 'You have not placed any order yet',
  orderPlaced: false,
  orderModified: false,
};

export const placeOrderSuccessAction = {
  type: PLACE_ORDER_SUCCESS,
  payload: true,
};
export const placeOrderSuccessState = {
  error: null,
  orderPlaced: true,
  orderModified: false,
};
export const placeOrderFailureAction = {
  type: PLACE_ORDER_FAILURE,
  payload: false,
};
export const placeOrderFailureState = {
  error: null,
  orderPlaced: false,
  orderModified: false,
};

export const modifyOrderSuccessAction = {
  type: MODIFY_ORDER_SUCCESS,
  payload: true,
};
export const modifyOrderSuccessState = {
  error: null,
  orderPlaced: false,
  orderModified: true,
};
export const modifyOrderFailureAction = {
  type: MODIFY_ORDER_FAILURE,
  payload: false,
};
export const modifyOrderFailureState = {
  error: null,
  orderPlaced: false,
  orderModified: false,
};
