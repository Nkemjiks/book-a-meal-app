import { combineReducers } from 'redux';
import userInformationReducer from './userInformationReducer';
import getMealsReducer from './getMealsReducer';
import getMenuReducer from './getMenuReducer';
import getAllMenuReducer from './getAllMenuReducer';
import getCatererOrderReducer from './getCatererOrderReducer';
import getAllCatererOrderReducer from './getAllCatererOrderReducer';
import getCustomerOrderHistoryReducer from './getCustomerOrderHistoryReducer';

const rootReducer = combineReducers({
  userInformation: userInformationReducer,
  getMeals: getMealsReducer,
  getMenu: getMenuReducer,
  getAllMenu: getAllMenuReducer,
  getCatererOrder: getCatererOrderReducer,
  getAllCatererOrder: getAllCatererOrderReducer,
  getCustomerOrderHistory: getCustomerOrderHistoryReducer,
});

export default rootReducer;
