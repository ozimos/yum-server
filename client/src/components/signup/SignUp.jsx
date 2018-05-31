import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import MyInput from '../helpers/MyInput';
import MyInputCheckBox from '../helpers/MyInputCheckBox';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';


class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.serverFeedback = this.serverFeedback.bind(this);
    this.formEl = null;
  }
  componentDidUpdate() {
    const { signupError } = this.props;
    if (Object.keys(signupError).length !== 0) {
      this.serverFeedback(signupError);
    }
  }
  handleSubmit(user) {
    this.props.dispatch(userActions.logout(user));
    this.props.dispatch(userActions.signUp(user));
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }
  serverFeedback(error) {
    this.formEl.updateInputsWithError(error);
  }


  render() {
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
              <Formsy
                className="form"
                onValidSubmit={this.handleSubmit}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                ref={(form) => { this.formEl = form; }}
              >

                <MyInput
                  typeOfInput="email"
                  name="email"
                  required
                  placeholder="Email"
                  validations="isEmail"
                  validationError="This is not a valid email"
                />
                <div className="invalid-feedback" />
                <MyInput
                  typeOfInput="text"
                  name="firstName"
                  placeholder="First Name"
                  validations="minLength:1"
                  validationError="Please enter your first name"
                  required
                />
                <div className="invalid-feedback" />
                <MyInput
                  typeOfInput="text"
                  name="lastName"
                  placeholder="Last Name"
                  validations="minLength:1"
                  validationError="Please enter your last name"
                  required
                />
                <MyInput
                  typeOfInput="password"
                  name="password"
                  placeholder="Password"
                  required
                  validations={{
                    hasUpperCase: (values, value) => /[A-Z]+|.{16,}/.test(value),
                    hasLowerCase: (values, value) => /[a-z]+|.{16,}/.test(value),
                    hasNumber: (values, value) => /\d+|.{16,}/.test(value),
                    hasSpecialCharacter: (values, value) => /\W+|.{16,}/.test(value),
                    minLength: 8
                  }}
                  validationErrors={{
                    hasUpperCase: 'Must have uppercase letter or you can use a passphrase of minimum length 16 characters',
                    hasLowerCase: 'Must have lowercase letter or you can use a passphrase of minimum length 16 characters',
                    hasNumber: 'Must have a number or you can use a passphrase of minimum length 16 characters',
                    hasSpecialCharacter: 'Must have a special character or you can use a passphrase of minimum length 16 characters',
                    minLength: 'Must have at least 8 characters'
                  }}
                />
                <MyInput
                  typeOfInput="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  validations={{
                    matchPassword: (values, value) => values.password === value
                  }}
                  validationErrors={{
                    matchPassword: 'Passwords do not match',
                  }}

                />
                <div>
                  <label htmlFor="isCaterer">
                    <MyInputCheckBox
                      name="isCaterer"
                      id="isCaterer"
                    />
                    Caterer
                  </label>
                </div>

                <button
                  className={this.state.canSubmit ? 'btn' : 'btn btn-disabled'}
                  type="submit"
                  disabled={!this.state.canSubmit}
                >
                  Continue
                </button>
              </Formsy>
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
SignUp.defaultProps = {
  signupError: {}
};
SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signupError: PropTypes.objectOf(PropTypes.string),
};
const mapStateToProps = state => ({
  signupError: state.signupReducer.signupError
});
export { SignUp };
export default connect(mapStateToProps)(hot(module)(SignUp));
