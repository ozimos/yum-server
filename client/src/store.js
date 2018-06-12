import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import {
  routerMiddleware
} from 'react-router-redux';
import {
  createLogger
} from 'redux-logger';
import rootReducer from './redux/reducers';
import history from './history';

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['login', 'signup']
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const loggerMiddleware = createLogger();
const middlewares = [routerMiddleware(history), thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}
const appliedMiddleware = applyMiddleware(...middlewares);
const store = createStore(rootReducer, compose(
  appliedMiddleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
// const persistor = persistStore(store);
// if (module.hot) {
//   module.hot.accept(() => {
//     // This fetch the new state of the above reducers.
//     const nextRootReducer = require('./redux/reducers');
//     store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
//   });
// }
export default store;

