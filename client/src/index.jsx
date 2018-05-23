import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
// import AppRoutes from './routes';
import configureStore from './configureStore';
import configureRouter from './configureRouter';
import App from './components/App.jsx';
import '../public/styles/app.css';

const router = configureRouter();
const store = configureStore(router);
const wrappedApp = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider >
  </Provider>
);
router.start(() => {
  ReactDOM.render(wrappedApp, document.getElementById('root'));
});