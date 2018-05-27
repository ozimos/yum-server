import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import '../../../public/styles/book_a_meal.css';


class SignUp extends React.Component {
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
            <form className="form" action="" onSubmit={this.handleSubmit}>

              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={user.email}
              />
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                placeholder="First Name"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                placeholder="Last Name"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
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
            </form>
            <div className="stacked-text">
              <Link to="/login"><p>Already have an account? Click here to sign in</p></Link>
            </div>
          </div>
        </main>

      </div>
    );
  }
}
SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect(state => state)(hot(module)(SignUp));
