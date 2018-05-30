import { CREATE_MENU_SUCCESS, CREATE_MENU_FAILURE } from '../actionTypes';

const addMealToMenuAction = (isCreated) => {
  return (dispatch) => {
    if (isCreated) {
      dispatch({
        type: CREATE_MENU_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: CREATE_MENU_FAILURE,
        payload: false,
      });
    }
  };
};

export default addMealToMenuAction;
