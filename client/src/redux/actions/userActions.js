import push from 'react-router-redux';
import {
  userTypes
} from '../types';
import userService from '../../services/userServices';
import {
  alertActions
} from './';

const request = (userData, actionType) => ({
  type: actionType,
  userData
});
const success = (userData, actionType) => ({
  type: actionType,
  userData
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

function login(username, password) {
  return (dispatch) => {
    dispatch(request({
      username
    }, userTypes.LOGIN_REQUEST));

    userService.login(username, password)
      .then(
        (user) => {
          dispatch(success(user, userTypes.LOGIN_SUCCESS));
          dispatch(push('/about'));
        },
        (error) => {
          dispatch(failure(error, userTypes.LOGIN_FAILURE));
          dispatch(alertActions.error(error));
        }
      );
  };


}

function logout() {
  userService.logout();
  return {
    type: userTypes.LOGOUT
  };
}

function signUp(user) {
  return (dispatch) => {
    dispatch(request(user, userTypes.REGISTER_REQUEST));

    userService.signUp(user, '/api/v1/auth/signup')
      .then(
        (userResults) => {
          dispatch(success(userResults, userTypes.REGISTER_SUCCESS));
          push('/about');
          dispatch(alertActions.success('Registration successful'));
        },
        (error) => {
          dispatch(failure(error, userTypes.REGISTER_FAILURE));
          dispatch(alertActions.error(error));
        }
      );
  };


}

function getAll() {
  return (dispatch) => {
    dispatch(request(null, userTypes.GETALL_REQUEST));

    userService.getAll()
      .then(
        users => dispatch(success(users, userTypes.GETALL_SUCCESS)),
        error => dispatch(failure(error, userTypes.GETALL_FAILURE))
      );
  };


}

export default {
  login,
  logout,
  signUp,
  getAll,
};