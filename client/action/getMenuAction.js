import { GET_MENU_SUCCESS, GET_MENU_FAILURE } from '../actionTypes';

const getMenuAction = (menuDetails, isGotten) => {
  return (dispatch) => {
    if (isGotten) {
      dispatch({
        type: GET_MENU_SUCCESS,
        payload: menuDetails,
      });
    } else {
      dispatch({
        type: GET_MENU_FAILURE,
        payload: menuDetails,
      });
    }
  };
};

export default getMenuAction;
