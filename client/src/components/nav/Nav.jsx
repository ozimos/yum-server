import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import '../../../public/styles/book_a_meal.css';

const Nav = () =>
  (
    <nav className="flexbox">
      <h2 className="shrink heading">Book A Meal</h2>
      <div className="flexbox nowrap">
        <NavLink activeClassName="active" to="/menu">
          Menu
        </NavLink>
        <NavLink activeClassName="active" to="/meals">
          Meals
        </NavLink>
        <a href="order_report.html">
          Orders
        </a>
        <NavLink activeClassName="active" to="/orders">
          Meal Booking
        </NavLink>
        <Link to="/login">
          Log Out
        </Link>
      </div>
    </nav>);

export default connect(state => state)(hot(module)(Nav));
