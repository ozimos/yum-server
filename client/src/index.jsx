// import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './AppRoutes.jsx';

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <AppRoutes />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
);