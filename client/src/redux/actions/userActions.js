import {
  push
} from 'react-router-redux';
import {
  userTypes
} from '../types';
import userService from '../../services/userServices';

const request = (user, actionType) => ({
  type: actionType,
  user
});
const success = (user, actionType) => ({
  type: actionType,
  user
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

const login = userData => (dispatch) => {
  dispatch(request({
    data: {
      email: userData.email
    }
  }, userTypes.LOGIN_REQUEST));

  userService.login(userData, '/api/v1/auth/login')
    .then(
      (user) => {
        dispatch(success(user, userTypes.LOGIN_SUCCESS));
        dispatch(push('/meals'));
      },
      (error) => {
        dispatch(failure(error.message, userTypes.LOGIN_FAILURE));
      }
    );
};

const logout = () => {
  userService.logout();
  return {
    type: userTypes.LOGOUT
  };
};

const signUp = user => (dispatch) => {
  dispatch(request(user, userTypes.SIGNUP_REQUEST));

  userService.signUp(user, '/api/v1/auth/signup')
    .then(
      (userResults) => {
        dispatch(success(userResults, userTypes.SIGNUP_SUCCESS));
        dispatch(success(userResults, userTypes.LOGIN_SUCCESS));
        dispatch(push('/meals'));
      },
      (error) => {
        dispatch(failure(error.message, userTypes.SIGNUP_FAILURE));
      }
    );
};

const getAll = () => (dispatch) => {
  dispatch(request(null, userTypes.GETALL_REQUEST));

  userService.getAll()
    .then(
      users => dispatch(success(users, userTypes.GETALL_SUCCESS)),
      error => dispatch(failure(error, userTypes.GETALL_FAILURE))
    );
};

export default {
  login,
  logout,
  signUp,
  getAll,
};