import {
  userTypes
} from '../types';
import validateToken from '../../services/validateToken';

const token = JSON.parse(localStorage.getItem('token'));

let result = {};
if (token) {
  result = validateToken(token);
}

if (!result.valid) { localStorage.removeItem('token'); }
const initialState = result.valid
  ? { authenticated: true,
    user: { data: {
      isCaterer: result.isCaterer,
      userId: result.userId,
      firstName: result.firstName,
    } } }
  : { authenticated: false, user: {} };

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
