import { GET_MENU_SUCCESS, GET_MENU_FAILURE } from '../actionTypes';

const initialState = {
  menu: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload,
        error: null,
      };
    case GET_MENU_FAILURE:
      return {
        ...state,
        menu: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
