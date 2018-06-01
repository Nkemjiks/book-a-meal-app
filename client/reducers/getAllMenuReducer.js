import { GET_ALL_MENU_SUCCESS, GET_ALL_MENU_FAILURE } from '../actionTypes';

const initialState = {
  allMenu: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MENU_SUCCESS:
      return {
        ...state,
        allMenu: action.payload,
        error: null,
      };
    case GET_ALL_MENU_FAILURE:
      return {
        ...state,
        allMenu: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
