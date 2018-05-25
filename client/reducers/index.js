import { combineReducers } from 'redux';
import userInformationReducer from './userInformationReducer';
import logoutReducer from './logoutReducer';
import addMealReducer from './addMealReducer';
import getMealsReducer from './getMealsReducer';

const rootReducer = combineReducers({
  userInformation: userInformationReducer,
  logout: logoutReducer,
  addMeal: addMealReducer,
  getMeals: getMealsReducer,
});

export default rootReducer;
