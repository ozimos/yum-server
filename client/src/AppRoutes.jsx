import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import App from './components/App';
import history from './history';
import { alertActions } from './redux/actions';
import { PrivateRoute } from './components/container/PrivateRoute';
import About from './components/presentational/About';
import SignUp from './components/presentational/SignUp';

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert
  };
};

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }
  render() {
    const { alert } = this.props;

    return (
      <React.Fragment>
        {
          alert.message &&
          <div className={`alert ${alert.type}`}>
            {alert.message}
          </div>
        }
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={SignUp} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/about" component={About} />
            <Route path="/app" component={App} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
AppRoutes.defaultProps = {
  alert: {}
};
AppRoutes.propTypes = {
  alert: PropTypes.shape({ message: PropTypes.string }),
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(hot(module)(AppRoutes));
