import { GET_ALL_CATERER_ORDER_SUCCESS, GET_ALL_CATERER_ORDER_FAILURE } from '../actionTypes';

const getAllCatererOrderAction = (orderDetails, isGotten) => {
  return (dispatch) => {
    if (isGotten) {
      dispatch({
        type: GET_ALL_CATERER_ORDER_SUCCESS,
        payload: orderDetails,
      });
    } else {
      dispatch({
        type: GET_ALL_CATERER_ORDER_FAILURE,
        payload: orderDetails,
      });
    }
  };
};

export default getAllCatererOrderAction;
