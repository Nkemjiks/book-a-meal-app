import { combineReducers } from 'redux';
import userInformationReducer from './userInformationReducer';
import logoutReducer from './logoutReducer';
import addMealReducer from './addMealReducer';

const rootReducer = combineReducers({
  userInformation: userInformationReducer,
  logout: logoutReducer,
  addMeal: addMealReducer,
});

export default rootReducer;
