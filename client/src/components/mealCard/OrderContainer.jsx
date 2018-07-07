import React from 'react';
import PropTypes from 'prop-types';

import '../../../public/styles/book_a_meal.css';


const OrderContainer = ({ OrderItem, orders, ...props }) =>
  (
    <div>
      <div className="row" style={{ borderBottom: '1px solid' }}>
        <div className="col-4">Order Id</div>
        <div className="col-5">Meal Title</div>
        <div className="col-1">Price</div>
        <div className="col-1">Quantity</div>
        <div className="col-1">Edit</div>
      </div>
      {orders.map(order => (<OrderItem
        key={order.id}
        {...order}
        {...props}
      />))
        }
    </div>
  );
OrderContainer.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  OrderItem: PropTypes.func.isRequired,
};

export default OrderContainer;

