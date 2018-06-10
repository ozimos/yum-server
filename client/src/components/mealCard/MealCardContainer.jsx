import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import '../../../public/styles/book_a_meal.css';


const MealCardContainer = ({ MealCard, meals, ...props }) =>
  (
    <div className={props.addClass ? `${props.addClass} gallery` : 'gallery'}>
      {meals.map(meal => (<MealCard
        key={meal.id}
        {...meal}
        {...props}
      />))
        }
    </div>
  );
MealCardContainer.defaultProps = {
  addClass: PropTypes.string
};
MealCardContainer.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  MealCard: PropTypes.func.isRequired,
  addClass: PropTypes.string,
};

export default hot(module)(MealCardContainer);

