import { combineReducers } from 'redux';
import userInformationReducer from './userInformationReducer';
import logoutReducer from './logoutReducer';
import mealReducer from './mealReducer';
import getMealsReducer from './getMealsReducer';
import createMenuReducer from './createMenuReducer';
import getMenuReducer from './getMenuReducer';
import getAllMenuReducer from './getAllMenuReducer';
import orderReducer from './orderReducer';
import getCatererOrderReducer from './getCatererOrderReducer';
import getAllCatererOrderReducer from './getAllCatererOrderReducer';
import getCustomerOrderHistoryReducer from './getCustomerOrderHistoryReducer';

const rootReducer = combineReducers({
  userInformation: userInformationReducer,
  logout: logoutReducer,
  singleMeal: mealReducer,
  getMeals: getMealsReducer,
  createMenu: createMenuReducer,
  getMenu: getMenuReducer,
  getAllMenu: getAllMenuReducer,
  placeOrder: orderReducer,
  getCatererOrder: getCatererOrderReducer,
  getAllCatererOrder: getAllCatererOrderReducer,
  getCustomerOrderHistory: getCustomerOrderHistoryReducer,
});

export default rootReducer;
