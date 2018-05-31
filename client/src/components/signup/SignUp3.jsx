import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import TextValidator from '../helpers/TextValidator';
import '../../../public/styles/book_a_meal.css';

ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
  if (value !== this.state.user.password) {
    return false;
  }
  return true;
});

class SignUp3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isCaterer: false
      },
      // submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.password) {
      dispatch(userActions.signUp(user));
    }
  }
  render() {
    const { user } = this.state;
    return (
      <div className="canvas">
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
              <ValidatorForm
                className="form"
                ref="form"
                onSubmit={this.handleSubmit}
                debounceTime={400}
              >

                <TextValidator
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={user.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
                <TextValidator
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  placeholder="First Name"
                  validators={['required']}
                  errorMessages={['this field is required']}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback" />
                <TextValidator
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  placeholder="Last Name"
                  validators={['required']}
                  errorMessages={['this field is required']}
                  onChange={this.handleChange}
                />
                <TextValidator
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Password"
                  validators={['required', 'matchReqexp:^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}|.{16,})$', 'minStringLength:6']}
                  errorMessages={[' Must be at least 6 characters long, and contain uppercase and lowercase letters and numbers and special character or must be a passphrase 16 or more characters long']}
                  onChange={this.handleChange}
                />
                <TextValidator
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  placeholder="Confirm Password"
                  required
                  onChange={this.handleChange}
                  validators={['required', 'isPasswordMatch']}
                  errorMessages={['Passwords do not match']}
                />
                <div className="invalid-feedback" />
                <div>
                  <label htmlFor="isCaterer">
                    <input
                      type="checkbox"
                      name="isCaterer"
                      id="isCaterer"
                      value={user.isCaterer}
                      onChange={this.handleChange}
                    />
                    Caterer
                  </label>
                </div>

                <button className="btn" type="submit">
                  Continue
                </button>
              </ValidatorForm>
              <div className="stacked-text">
                <Link to="/login"><p>Already have an account? Click here to sign in</p></Link>
              </div>
            </div>
          </main>

        </div>
      </div>
    );
  }
}
SignUp3.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export { SignUp3 };
export default connect(state => state)(hot(module)(SignUp3));
