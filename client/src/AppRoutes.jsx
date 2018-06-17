import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import history from './history';
import PrivateRoute from './components/container/PrivateRoute';
import requireCaterer from './components/container/requireCaterer';
import requireUser from './components/container/requireUser';
import ConnectedMealManager from './components/mealManager/MealManager';
import ConnectedSignUp from './components/signup/SignUp';
import ConnectedLogin from './components/login/Login';
import ConnectedMenu from './components/menu/Menu';
import ConnectedOrder from './components/orders/Order';

const MealManagerWithAuthorization = requireCaterer(ConnectedMealManager);
const MenuWithAuthorization = requireCaterer(ConnectedMenu);
const OrderWithAuthorization = requireUser(ConnectedOrder);
const AppRoutes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <PrivateRoute exact path="/" component={ConnectedMealManager} />
      <Route exact path="/login" component={ConnectedLogin} />
      <Route exact path="/signup" component={ConnectedSignUp} />
      <Route path="/meals" component={MealManagerWithAuthorization} />
      <Route path="/menu" component={MenuWithAuthorization} />
      <Route path="/orders" component={OrderWithAuthorization} />
    </Switch>
  </ConnectedRouter>
);

export default connect(state => state)(hot(module)(AppRoutes));
