import { CREATE_MENU_SUCCESS, CREATE_MENU_FAILURE } from '../actionTypes';

const initialState = {
  isCreated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload,
      };
    case CREATE_MENU_FAILURE:
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
};
