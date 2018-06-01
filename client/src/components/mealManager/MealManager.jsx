import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MealCardContainer from '../mealCard/MealCardContainer';
import Nav from '../nav/Nav';
import '../../../public/styles/book_a_meal.css';

export class MealManager extends React.Component {
  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.dispatch(push('/login'));
    }
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <Nav />
        </header>
        <main>
          <div>
            <h3>Welcome Caterer Sanni</h3>
          </div>
          <div className="title flexbox">
            <h3 className="shrink">
              Your Meals
            </h3>
            <div className="flexbox nowrap">
              <p>Click on a meal title to edit the meal or</p>
              <button className="title-button modal-trigger">
                <p>Add Meal</p>
              </button>
            </div>
          </div>
          <MealCardContainer />
        </main>
      </div>
    );
  }
}
MealManager.defaultProps = {
  authenticated: false,
};
MealManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};
const mapStateToProps = state =>
  ({ authenticated: state.loginReducer.authenticated });

export default connect(mapStateToProps)(hot(module)(MealManager));
