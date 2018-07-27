import React from 'react';
import PropTypes from 'prop-types';
import '../../../public/styles/order_item.scss';

const OrderItem = ({ id, Meals, addOrder, position }) => {
  const details = Meals.map(meal => (
    <div key={meal.id} className="row">
      <div className="col s7 text_left long_string left_pad">{meal.title}</div>
      <div className="col s3 text_left left_pad">{meal.price}</div>
      <div className="col s2 text_left">{meal.MealOrders.quantity}</div>
    </div>));
  return (
    <div className="row order_item" style={{ borderBottom: '1px solid' }}>
      <div className="col s1 text_left">{position}</div>
      <div className="col s9 text_left">
        {details}
      </div>
      <div className="col s1 text_right">
        <button onClick={() => addOrder(id)} className="btn title-button">Edit</button>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  Meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  addOrder: PropTypes.func.isRequired
};
export default OrderItem;

