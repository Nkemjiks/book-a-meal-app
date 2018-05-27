import { ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE, MODIFY_MEAL_SUCCESS, MODIFY_MEAL_FAILURE, DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE } from '../actionTypes';

const initialState = {
  isMealAdded: false,
  isMealModified: false,
  isMealDeleted: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        isMealAdded: action.payload,
        isMealModified: false,
        isMealDeleted: false,
      };
    case ADD_MEAL_FAILURE:
      return {
        ...state,
        isMealAdded: action.payload,
        isMealModified: false,
        isMealDeleted: false,
      };
    case MODIFY_MEAL_SUCCESS:
      return {
        ...state,
        isMealAdded: false,
        isMealModified: action.payload,
        isMealDeleted: false,
      };
    case MODIFY_MEAL_FAILURE:
      return {
        ...state,
        isMealAdded: false,
        isMealModified: action.payload,
        isMealDeleted: false,
      };
    case DELETE_MEAL_SUCCESS:
      return {
        ...state,
        isMealAdded: false,
        isMealModified: false,
        isMealDeleted: action.payload,
      };
    case DELETE_MEAL_FAILURE:
      return {
        ...state,
        isMealAdded: false,
        isMealModified: false,
        isMealDeleted: action.payload,
      };
    default:
      return state;
  }
};
