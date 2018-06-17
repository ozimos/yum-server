import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { cartReducer } from 'react-shopping-cart';

import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import userReducer from './userReducer';
import mealsReducer from './mealsReducer';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  // cart: cartReducer,
  loginReducer,
  signupReducer,
  userReducer,
  mealsReducer,
  menuReducer,
  orderReducer
});

export default rootReducer;