import { userTypes } from '../types';
import { userService } from '../../services/userServices';
import { alertActions } from './';
import { history } from '../../history';


function login(username, password) {
  function request(user) { return { type: userTypes.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userTypes.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userTypes.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };


}

function logout() {
  userService.logout();
  return { type: userTypes.LOGOUT };
}

function signUp(user) {
  const request = userData => ({ type: userTypes.REGISTER_REQUEST, userData });
  const success = userData => ({ type: userTypes.REGISTER_SUCCESS, userData });
  const failure = error => ({ type: userTypes.REGISTER_FAILURE, error });
  return (dispatch) => {
    dispatch(request(user));

    userService.signUp(user)
      .then(
        (userResults) => {
          dispatch(success(userResults));
          history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };


}

function getAll() {
  function request() { return { type: userTypes.GETALL_REQUEST }; }
  function success(users) { return { type: userTypes.GETALL_SUCCESS, users }; }
  function failure(error) { return { type: userTypes.GETALL_FAILURE, error }; }
  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };


}

export default {
  login,
  logout,
  signUp,
  getAll,
};
