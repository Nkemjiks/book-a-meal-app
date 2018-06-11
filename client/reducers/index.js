import { combineReducers } from 'redux';
import userInformation from './userInformation';
import getMeals from './getMeals';
import getMenu from './getMenu';
import getAllMenu from './getAllMenu';
import getCatererOrder from './getCatererOrders';
import getAllCatererOrder from './getAllCatererOrders';
import getCustomerOrderHistory from './getCustomerOrderHistory';
import singleRequest from './singleRequest';
import imageUpload from './imageUpload';
import uploadProgress from './uploadProgress';

const rootReducer = combineReducers({
  userInformation,
  getMeals,
  getMenu,
  getAllMenu,
  getCatererOrder,
  getAllCatererOrder,
  getCustomerOrderHistory,
  singleRequest,
  imageUpload,
  uploadProgress,
});

export default rootReducer;
