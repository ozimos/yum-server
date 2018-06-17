import {
  userTypes
} from '../types';
import validateToken from '../../services/validateToken';

const user = localStorage.getItem('user');
let result = {};
if (user && user.constructor === Object && Object.keys(user).length !== 0) {
  result = validateToken(user);
}

if (!result.valid) { localStorage.removeItem('user'); }
const initialState = result.valid ? { authenticated: true, user } : {};
// const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        authenticated: true,
        user: action.user
      };
    case userTypes.LOGIN_FAILURE:
      return { loginError: action.error };
    case userTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};