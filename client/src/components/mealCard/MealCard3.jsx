import React from 'react';
import PropTypes from 'prop-types';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';
import '../../../public/styles/modalOpenButton.scss';

const MealCard3 = ({ id, title, imageUrl, price, description, ...props }) => {
  const meal = { id, title, imageUrl, price, description };
  return (
    <React.Fragment>
      <div className="card">
        <img src={imageUrl} alt="Meal" className="fluid-img" />
        <div className="title-element flexbox wrap">
          <div className="shrink">
            {title}
          </div>
          <div className="flexbox">

            {props.addToOrder &&
              <button className="btn title-button icon" onClick={() => props.addToOrder(meal)}>
                &#10004;
              </button>}
            {props.removeFromOrder &&
              <button className="btn title-button icon" onClick={() => props.removeFromOrder(id)}>
                &#10006;
              </button>}
          </div>

        </div>
      </div>
    </React.Fragment>
  );
};

MealCard3.defaultProps = {
  addToOrder: null,
  removeFromOrder: null,
};
MealCard3.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  addToOrder: PropTypes.func,
  removeFromOrder: PropTypes.func,
};
export { MealCard3 };
export default MealCard3;

