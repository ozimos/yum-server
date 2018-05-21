import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';

const middleware = applyMiddleware(thunk);
export default createStore(reducer, compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f

));