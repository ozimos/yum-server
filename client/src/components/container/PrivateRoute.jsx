import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import validateToken from '../../services/validateToken';

const user = localStorage.getItem('user');
let result = {};
if (user && user.constructor === Object && Object.keys(user).length !== 0) {
  result = validateToken(user);
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      result.valid && user.data.isCaterer
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export default connect(state => state)(hot(module)(PrivateRoute));