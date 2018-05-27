import { combineReducers } from 'redux';
import userInformationReducer from './userInformationReducer';
import logoutReducer from './logoutReducer';
import mealReducer from './mealReducer';
import getMealsReducer from './getMealsReducer';

const rootReducer = combineReducers({
  userInformation: userInformationReducer,
  logout: logoutReducer,
  singleMeal: mealReducer,
  getMeals: getMealsReducer,
});

export default rootReducer;
