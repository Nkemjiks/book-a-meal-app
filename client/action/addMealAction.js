import { ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE } from '../actionTypes';

const addMealAction = (isAdded) => {
  return (dispatch) => {
    if (isAdded) {
      dispatch({
        type: ADD_MEAL_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: ADD_MEAL_FAILURE,
        payload: false,
      });
    }
  };
};

export default addMealAction;
