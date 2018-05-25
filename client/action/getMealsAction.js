import { GET_MEALS_SUCCESS, GET_MEALS_FAILURE } from '../actionTypes';

const getMealsAction = (mealDetails, isGotten) => {
  return (dispatch) => {
    if (isGotten) {
      dispatch({
        type: GET_MEALS_SUCCESS,
        payload: mealDetails,
      });
    } else {
      dispatch({
        type: GET_MEALS_FAILURE,
        payload: mealDetails,
      });
    }
  };
};

export default getMealsAction;
