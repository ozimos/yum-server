import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const AuthenticatedComponent = (props) => {
  const {
    MyComponent,
    authenticated,
    user,
    ...rest
  } = props;

  return (
    <Fragment>
      { authenticated && <MyComponent {...rest} />}
      { !authenticated && <Redirect to="/login" />}
    </Fragment>
  );
};
AuthenticatedComponent.defaultProps = {
  authenticated: false,
  user: { data: {} }
};
AuthenticatedComponent.propTypes = {
  authenticated: PropTypes.bool,
  MyComponent: PropTypes.func.isRequired,
  user: PropTypes.shape({ data: PropTypes.object, token: PropTypes.string })
};

const requireUser = (MyComponent) => {
  const mapStateToProps = state => ({
    authenticated: state.loginReducer.authenticated,
    user: state.loginReducer.user,
    MyComponent
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default requireUser;