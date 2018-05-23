import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import userInformationReducer from './userInformationReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  userInformation: userInformationReducer,
});

export default rootReducer;
