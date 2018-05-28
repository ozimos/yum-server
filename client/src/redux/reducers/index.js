import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import userReducer from './userReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  loginReducer,
  signupReducer,
  userReducer,
  alertReducer
});

export default rootReducer;