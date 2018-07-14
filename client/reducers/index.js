import { combineReducers } from 'redux';
import userInformation from './userInformation';
import catererMeals from './catererMeals';
import catererMenu from './catererMenu';
import getAllMenu from './getAllMenu';
import getCatererOrder from './getCatererOrders';
import getAllCatererOrder from './getAllCatererOrders';
import customerOrder from './customerOrder';
import imageUpload from './imageUpload';
import getMealsInMenu from './getMealsInMenu';

const rootReducer = combineReducers({
  userInformation,
  catererMeals,
  catererMenu,
  getAllMenu,
  getCatererOrder,
  getAllCatererOrder,
  customerOrder,
  imageUpload,
  getMealsInMenu,
});

export default rootReducer;
