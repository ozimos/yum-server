import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import userReducer from './userReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  loginReducer,
  signupReducer,
  userReducer,
  alertReducer
});

export default rootReducer;