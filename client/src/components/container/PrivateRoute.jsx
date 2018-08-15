import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import validateToken from '../../services/validateToken';

const user = JSON.parse(localStorage.getItem('user'));
let result = {};
if (user && (user.constructor === Object) && (Object.keys(user).length !== 0)) {
  result = validateToken(user);
}

const PrivateRoute = ({ caterer: Caterer, customer: Customer, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (result.valid && user.data.isCaterer) {
        return (<Caterer {...props} />);

      } else if (result.valid && !user.data.isCaterer) {
        return (<Customer {...props} />);
      } return (<Redirect to="/login" />);
    }}
  />
);
PrivateRoute.defaultProps = {
  caterer: null,
  customer: null,
};
PrivateRoute.propTypes = {
  caterer: PropTypes.func,
  customer: PropTypes.func,
};
export default PrivateRoute;
