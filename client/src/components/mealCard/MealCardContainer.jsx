import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import MealCard from './MealCard';
import { mealActions } from '../../redux/actions';
import '../../../public/styles/book_a_meal.css';


class MealCardContainer extends React.Component {

  componentDidMount() {
    this.props.dispatch(mealActions.getAllMeals());
  }
  // componentDidUpdate() {
  //   if (this.props.deleted !== '') {
  //     this.props.dispatch(mealActions.getAllMeals());
  //   }
  // }


  render() {
    return (
      <div className="gallery">
        {this.props.meals.map(meal => (<MealCard
          key={meal.id}
          {...meal}
        />))
        }
      </div>
    );
  }
}
MealCardContainer.defaultProps = {
  deleted: ''
};
MealCardContainer.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleted: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  mealError: state.mealsReducer.loginError,
  connecting: state.mealsReducer.connecting,
  deleted: state.mealsReducer.deleted,
  meals: state.mealsReducer.meals,
});
export default connect(mapStateToProps)(hot(module)(MealCardContainer));

