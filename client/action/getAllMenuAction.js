import { GET_ALL_MENU_SUCCESS, GET_ALL_MENU_FAILURE } from '../actionTypes';

const getMenuAction = (menuDetails, isGotten) => {
  return (dispatch) => {
    if (isGotten) {
      dispatch({
        type: GET_ALL_MENU_SUCCESS,
        payload: menuDetails,
      });
    } else {
      dispatch({
        type: GET_ALL_MENU_FAILURE,
        payload: menuDetails,
      });
    }
  };
};

export default getMenuAction;
