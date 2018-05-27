import { DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE } from '../actionTypes';

const deleteMealAction = (isDeleted) => {
  return (dispatch) => {
    if (isDeleted) {
      dispatch({
        type: DELETE_MEAL_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: DELETE_MEAL_FAILURE,
        payload: false,
      });
    }
  };
};

export default deleteMealAction;
