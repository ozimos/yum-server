import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import '../../../public/styles/book_a_meal.css';


const MealCardContainer = ({ MealCard, meals, ...props }) =>
  (
    <div className="gallery">
      {meals.map(meal => (<MealCard
        key={meal.id}
        {...meal}
        {...props}
      />))
        }
    </div>
  );

MealCardContainer.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  MealCard: PropTypes.func.isRequired,
};

export default hot(module)(MealCardContainer);

