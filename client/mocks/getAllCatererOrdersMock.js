import {
  GET_ALL_CATERER_ORDER_SUCCESS,
  GET_ALL_CATERER_ORDER_FAILURE,
} from '../actionTypes';

export const initialState = {
  allOrders: {},
  error: null,
};

export const getOrderSuccessAction = {
  type: GET_ALL_CATERER_ORDER_SUCCESS,
  payload: {
    data: [],
  },
};
export const getOrderSuccessState = {
  allOrders: {
    data: [],
  },
  error: null,
};
export const getOrderFailureAction = {
  type: GET_ALL_CATERER_ORDER_FAILURE,
  payload: 'You don\' have any order yet',
};
export const getOrderFailureState = {
  allOrders: {},
  error: 'You don\' have any order yet',
};
