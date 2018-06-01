import { GET_CATERER_ORDER_SUCCESS, GET_CATERER_ORDER_FAILURE } from '../actionTypes';

const getCatererOrderAction = (orderDetails, isGotten) => {
  return (dispatch) => {
    if (isGotten) {
      dispatch({
        type: GET_CATERER_ORDER_SUCCESS,
        payload: orderDetails,
      });
    } else {
      dispatch({
        type: GET_CATERER_ORDER_FAILURE,
        payload: orderDetails,
      });
    }
  };
};

export default getCatererOrderAction;
