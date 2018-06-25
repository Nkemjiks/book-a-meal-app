import {
  GET_CATERER_ORDER_SUCCESS,
  GET_CATERER_ORDER_FAILURE,
} from '../actionTypes';

export const initialState = {
  orders: {},
  error: null,
};

export const getOrderSuccessAction = {
  type: GET_CATERER_ORDER_SUCCESS,
  payload: {
    data: [],
  },
};
export const getOrderSuccessState = {
  orders: {
    data: [],
  },
  error: null,
};
export const getOrderFailureAction = {
  type: GET_CATERER_ORDER_FAILURE,
  payload: 'You don\' have any order yet',
};
export const getOrderFailureState = {
  orders: {},
  error: 'You don\' have any order yet',
};
