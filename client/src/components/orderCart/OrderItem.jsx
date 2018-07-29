import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import isToday from 'date-fns/is_today';
import '../../../public/styles/order_item.scss';

const OrderItem = ({ id, Meals, addOrder, position, updatedAt }) => {
  const details = Meals.map(meal => (
    <div key={meal.id} className="row">
      <div className="col s7 text_left long_string left_pad">{meal.title}</div>
      <div className="col s3 text_left left_pad">{meal.price}</div>
      <div className="col s2 text_left">{meal.MealOrders.quantity}</div>
    </div>));
  const hasEditMinutes = (parseInt(process.env.ORDER_EDIT_MINUTES, 10) || 15)
       - differenceInMinutes(new Date(), updatedAt) > 0;

  return (
    <div className="row order_item" style={{ borderBottom: '1px solid' }}>
      <div className="col s1 text_left">{position}</div>
      <div className="col s9">
        {details}
      </div>
      <div className="col s1 text_left">{format(updatedAt, 'h:m A')}</div>
      <div className="col s1 text_right">
        {
          isToday(updatedAt) && hasEditMinutes &&
          <button onClick={() => addOrder(id)} className="btn title-button">Edit</button>
        }
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  Meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  addOrder: PropTypes.func.isRequired
};
export default OrderItem;

