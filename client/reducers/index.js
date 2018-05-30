import { combineReducers } from 'redux';
import userInformationReducer from './userInformationReducer';
import logoutReducer from './logoutReducer';
import mealReducer from './mealReducer';
import getMealsReducer from './getMealsReducer';
import createMenuReducer from './createMenuReducer';
import getMenuReducer from './getMenuReducer';
import getAllMenuReducer from './getAllMenuReducer';

const rootReducer = combineReducers({
  userInformation: userInformationReducer,
  logout: logoutReducer,
  singleMeal: mealReducer,
  getMeals: getMealsReducer,
  createMenu: createMenuReducer,
  getMenu: getMenuReducer,
  getAllMenu: getAllMenuReducer,
});

export default rootReducer;
