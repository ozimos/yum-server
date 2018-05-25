import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('user')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/signup', state: { from: props.location } }} />
    )}
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  location: PropTypes.func.isRequired,
};
export default connect(state => state)(hot(module)(PrivateRoute));