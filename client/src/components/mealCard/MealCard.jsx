import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import '../../../public/styles/book_a_meal.css';

const MealCard = ({ title, imageUrl }) => (
  <div className="card">
    <img src={imageUrl} alt="Meal" className="fluid-img" />
    <div className="title-element flexbox wrap">
      <h4 className="shrink modal-trigger">
        {title}
      </h4>
      <div className="flexbox">
        <button className="title-button icon">
          &#10006;
        </button>
      </div>

    </div>
  </div>
);
MealCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
export default hot(module)(MealCard);

