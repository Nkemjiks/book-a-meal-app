import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from '../actionTypes';

const placeOrderAction = (isPlaced) => {
  return (dispatch) => {
    if (isPlaced) {
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: PLACE_ORDER_FAILURE,
        payload: false,
      });
    }
  };
};

export default placeOrderAction;
