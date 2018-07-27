import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../../public/styles/nav.scss';

const Nav = ({ user }) =>
  (
    <div className="navbar-fixed">
      <nav className="flexbox">
        <h3 className="shrink heading">Book A Meal</h3>
        <div className="flexbox">
          {user.isCaterer &&
          <NavLink activeClassName="active" className="nav-item long_string" to="/dashboard">
        DashBoard
          </NavLink >}
          {user.isCaterer &&
          <NavLink activeClassName="active" className="nav-item" to="/meals">
          Meals
          </NavLink >}
          {user.isCaterer &&
          <NavLink activeClassName="active" className="nav-item" to="/menu">
          Menu
          </NavLink>}
          <NavLink activeClassName="active" className="nav-item" to="/orders">
          Meal Booking
          </NavLink>
          <Link to="/login">
          Log Out
          </Link>
        </div>
      </nav>
    </div>
  );
Nav.propTypes = {
  user: PropTypes.shape({
    isCaterer: PropTypes.bool,
  }).isRequired,
};
const mapStateToProps = state => ({
  user: state.loginReducer.user.data,
  authenticated: state.loginReducer.authenticated,
});
export { Nav };
export default connect(mapStateToProps)(Nav);
