import { GET_CUSTOMER_ORDER_HISTORY_SUCCESS, GET_CUSTOMER_ORDER_HISTORY_FAILURE } from '../actionTypes';

const getCustomerOrderHistoryAction = (orderDetails, isGotten) => {
  return (dispatch) => {
    if (isGotten) {
      dispatch({
        type: GET_CUSTOMER_ORDER_HISTORY_SUCCESS,
        payload: orderDetails,
      });
    } else {
      dispatch({
        type: GET_CUSTOMER_ORDER_HISTORY_FAILURE,
        payload: orderDetails,
      });
    }
  };
};

export default getCustomerOrderHistoryAction;
