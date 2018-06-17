import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

const OrderItem = ({ id, Meals, addOrder }) => {
  const details = Meals.map(meal => (
    <div key={meal.id} className="row">
      <div className="col-8">{meal.title}</div>
      <div className="col-3">{meal.price}</div>
      <div className="col-1">{meal.MealOrders.quantity}</div>
    </div>));
  return (
    <div className="row" style={{ borderBottom: '1px solid' }}>
      <div className="col-4">{id}</div>
      <div className="col-7">
        {details}
      </div>
      <div className="col-1">
        <button onClick={() => addOrder(id)} className="btn btn-primary">Edit</button>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  Meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  addOrder: PropTypes.func.isRequired
};
export default hot(module)(OrderItem);

