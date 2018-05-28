import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import '../../../public/styles/book_a_meal.css';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: '',
      password: '',
      // submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }
  render() {
    const { email, password } = this.state;
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
                Sign in by entering the information below
              </h4>
            </div>
            <div className="form-box">
              <form className="form" action="" onSubmit={this.handleSubmit}>

                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <button className="btn" type="submit">
                  Continue
                </button>
              </form>
              <div className="stacked-text">
                <Link to="/signup">
                  <p>
                  Don&#39;t have an account?
                   Click here to create one
                  </p>
                </Link>
              </div>
            </div>
          </main>

        </div>
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect(state => state)(hot(module)(Login));
