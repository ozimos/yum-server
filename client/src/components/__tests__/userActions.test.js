import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import userActions from '../../redux/actions/userActions';
import userTypes from '../../redux/types/userTypes';
import { userData, userInput } from '../mocks/userDataMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('meal async actions', () => {

  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'dispatches LOGIN_REQUEST and LOGIN_SUCCESS on successfully fetching user',
    () => {

      moxios.stubRequest('/api/v1/auth/login', {
        status: 200,
        response: userData
      });

      const expectedActions = [
        { type: userTypes.LOGIN_REQUEST, user: userInput },
        { type: userTypes.LOGIN_SUCCESS, user: userData },
        { type: '@@router/CALL_HISTORY_METHOD',
          payload: { args: ['/orders'], method: 'push' } }
      ];

      return store.dispatch(userActions.login(userInput.data))
        .then(() => {
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
        });
    }
  );
  it(
    'dispatches LOGIN_REQUEST and LOGIN_FAILURE on failing creating user',
    () => {

      moxios.stubRequest('/api/v1/auth/login', {
        status: 400,
        response: { message: 'problem' }
      });

      const expectedActions = [
        { type: userTypes.LOGIN_REQUEST, user: userInput },
        { type: userTypes.LOGIN_FAILURE, error: 'problem' },
      ];

      return store.dispatch(userActions.login(userInput.data))
        .then(() => {
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
        });
    }
  );
  it(
    'dispatches SIGNUP_REQUEST and SIGNUP_SUCCESS' +
    ' on successfully creating user',
    () => {

      moxios.stubRequest('/api/v1/auth/signup', {
        status: 200,
        response: userData
      });

      const expectedActions = [
        { type: userTypes.SIGNUP_REQUEST, user: userInput.data },
        { type: userTypes.SIGNUP_SUCCESS, user: userData },
        { type: userTypes.LOGIN_SUCCESS, user: userData },
        { type: '@@router/CALL_HISTORY_METHOD',
          payload: { args: ['/orders'], method: 'push' } }
      ];

      return store.dispatch(userActions.signUp(userInput.data))
        .then(() => {
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
        });
    }
  );

  it(
    'dispatches SIGNUP_REQUEST and SIGNUP_FAILURE on failing creating user',
    () => {

      moxios.stubRequest('/api/v1/auth/signup', {
        status: 400,
        response: { message: 'problem' }
      });

      const expectedActions = [
        { type: userTypes.SIGNUP_REQUEST, user: userInput.data },
        { type: userTypes.SIGNUP_FAILURE, error: 'problem' },
      ];

      return store.dispatch(userActions.signUp(userInput.data))
        .then(() => {
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
        });
    }
  );
});
