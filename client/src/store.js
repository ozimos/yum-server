import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import {
  routerMiddleware
} from 'react-router-redux';
import {
  createLogger
} from 'redux-logger';
import rootReducer from './redux/reducers';
import history from './history';


const loggerMiddleware = createLogger();

const middleware = applyMiddleware(routerMiddleware(history), thunk, loggerMiddleware);
const store = createStore(rootReducer, compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
export default store;