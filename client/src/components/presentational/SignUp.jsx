import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../../public/styles/book_a_meal.css';

function SignUp(props) {
  return (
    <div className="container2">
      <header className="header">
        <h1 className="heading">Book A Meal</h1>
      </header>
      <main>
        <div className="welcome">
          <h1 className="welcome-text">
            Welcome!
          </h1>
          <h4>
            Register by entering the information below
          </h4>
        </div>
        <div className="form-box">
          <form className="form" action="">

            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="firstName" placeholder="First Name" />
            <input type="text" name="lastName" placeholder="Last Name" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" />
            <div>
              <input type="checkbox" name="isCaterer" id="isCaterer" value="true" />
              <label htmlFor="isCaterer">Caterer</label>
            </div>

            <a href="meal_list.html" className="btn">
              Continue
            </a>
          </form>
          <div className="stacked-text">
            <a href="sign_in.html"><p>Already have an account? Click here to sign in</p></a>
          </div>
        </div>
      </main>

    </div>
  );
}
SignUp.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default connect(state => state )(hot(module)(SignUp));
