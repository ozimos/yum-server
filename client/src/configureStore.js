import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import photoReducer from './redux/reducers/reducer';
import messageReducer from './redux/reducers/message';

const configureStore = (initialState = {}) => {

  const reducer = combineReducers({
    messageReducer,
    photoReducer
  });
  const middleware = applyMiddleware(thunk);
  const store = createStore(reducer, initialState, compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  window.store = store;
  return store;
};
export default configureStore;