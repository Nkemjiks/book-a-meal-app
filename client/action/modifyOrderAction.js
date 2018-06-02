import { MODIFY_CUSTOMER_ORDER_SUCCESS, MODIFY_CUSTOMER_ORDER_FAILURE } from '../actionTypes';

const modifyOrderAction = (isModified) => {
  return (dispatch) => {
    if (isModified) {
      dispatch({
        type: MODIFY_CUSTOMER_ORDER_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: MODIFY_CUSTOMER_ORDER_FAILURE,
        payload: false,
      });
    }
  };
};

export default modifyOrderAction;
