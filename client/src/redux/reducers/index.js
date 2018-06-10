import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import userReducer from './userReducer';
import mealsReducer from './mealsReducer';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  loginReducer,
  signupReducer,
  userReducer,
  mealsReducer,
  menuReducer
});

export default rootReducer;