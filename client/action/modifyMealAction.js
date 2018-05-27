import { MODIFY_MEAL_SUCCESS, MODIFY_MEAL_FAILURE } from '../actionTypes';

const modifyMealAction = (isModified) => {
  return (dispatch) => {
    if (isModified) {
      dispatch({
        type: MODIFY_MEAL_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: MODIFY_MEAL_FAILURE,
        payload: false,
      });
    }
  };
};

export default modifyMealAction;
