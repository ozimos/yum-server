import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose
} from 'redux';
import {
  router5Middleware,
  router5Reducer
} from 'redux-router5';
import thunk from 'redux-thunk';
import {
  createLogger
} from 'redux-logger';
import photoReducer from './redux/reducers/reducer';
import messageReducer from './redux/reducers/message';

const configureStore = (router, initialState = {}) => {

  const reducer = combineReducers({
    router: router5Reducer,
    messageReducer,
    photoReducer
  });
  const middleware = applyMiddleware(
    router5Middleware(router),
    createLogger(), thunk
  );
  const store = createStore(reducer, initialState, compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  window.store = store;
  return store;
};
export default configureStore;