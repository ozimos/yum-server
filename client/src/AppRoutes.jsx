import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import history from './history';
import { alertActions } from './redux/actions';
import PrivateRoute from './components/container/PrivateRoute';
import ConnectedMealManager from './components/mealManager/MealManager';
import ConnectedSignUp from './components/signup/SignUp';
import ConnectedLogin from './components/login/Login';

const mapStateToProps = (state) => {
  const { alert } = state.alertReducer;
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
        <ConnectedRouter history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={ConnectedMealManager} />
            <Route exact path="/login" component={ConnectedLogin} />
            <Route exact path="/signup" component={ConnectedSignUp} />
            <Route path="/meals" component={ConnectedMealManager} />
          </Switch>
        </ConnectedRouter>
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
