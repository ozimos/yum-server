import React from 'react';
import PropTypes from 'prop-types';
import '../../../public/styles/mealcard3.scss';

const MealCard3 = ({ id, title, imageUrl, price, description, ...props }) => {
  const meal = { id, title, imageUrl, price, description };
  return (
    <React.Fragment>
      <div className="card card-booking pillar">
        <img src={imageUrl} alt="Meal" className="fluid-img" />
        <div className="pillar">
          <div className="title-element text_left long_string">
            {title}
          </div>
          <div className="flexbox">
            <div className="text_left pad">
          &#8358;{price}
            </div>
            {props.addToOrder &&
            <button className="btn title-button" onClick={() => props.addToOrder(meal)} >
                Add to Cart
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
export default MealCard3;

