import React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import '../../../public/styles/book_a_meal.css';

const Nav = () =>
  (
    <nav className="flexbox">
      <h2 className="shrink heading">Book A Meal</h2>
      <div className="flexbox nowrap">
        <a href="menu_editor.html">
          Menu

        </a>
        <a href="order_report.html">
          Orders

        </a>
        <a href="meal_booking.html">
          Meal Booking

        </a>
        <Link to="/login">
          Log Out

        </Link>
      </div>
    </nav>);

export default connect(state => state)(hot(module)(Nav));
