import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './redux/reducers';

const loggerMiddleware = createLogger();
const configureStore = (initialState = {}) => {

  const middleware = applyMiddleware(thunk, loggerMiddleware);
  const store = createStore(rootReducer, initialState, compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  window.store = store;
  return store;
};
export default configureStore;