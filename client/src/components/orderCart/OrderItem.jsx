import React from 'react';
import PropTypes from 'prop-types';

const OrderItem = ({ id, Meals, addOrder, position }) => {
  const details = Meals.map(meal => (
    <div key={meal.id} className="row">
      <div className="col-7 text-left">{meal.title}</div>
      <div className="col-3 text-left">{meal.price}</div>
      <div className="col-2 text-left">{meal.MealOrders.quantity}</div>
    </div>));
  return (
    <div className="row" style={{ borderBottom: '1px solid' }}>
      <div className="col-1 text-left">{position}</div>
      <div className="col-9 text-left">
        {details}
      </div>
      <div className="col-1 text-right">
        <button onClick={() => addOrder(id)} className="btn btn-primary">Edit</button>
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

