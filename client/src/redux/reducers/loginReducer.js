import {
  userTypes
} from '../types';

const user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user ? { authenticated: true, user } : {};

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