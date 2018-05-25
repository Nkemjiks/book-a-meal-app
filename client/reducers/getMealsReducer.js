import {
  GET_MEALS_SUCCESS,
  GET_MEALS_FAILURE,
} from '../actionTypes';

const initialState = {
  meals: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MEALS_SUCCESS:
      return {
        ...state,
        meals: action.payload,
        error: null,
      };
    case GET_MEALS_FAILURE:
      return {
        ...state,
        meals: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
