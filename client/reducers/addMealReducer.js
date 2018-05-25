import { ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE } from '../actionTypes';

const initialState = {
  isMealAdded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        isMealAdded: action.payload,
      };
    case ADD_MEAL_FAILURE:
      return {
        ...state,
        isMealAdded: action.payload,
      };
    default:
      return state;
  }
};
