import React from 'react';
import PropTypes from 'prop-types';

import '../../../public/styles/book_a_meal.css';


const OrderContainer = ({ OrderItem, orders, ...props }) =>
  (
    <div className="mx-1">
      <div className="row" style={{ borderBottom: '1px solid' }}>
        <div className="col-1 text-left">No</div>
        <div className="col-5 text-left">Meal Title</div>
        <div className="col-2 text-left">Price</div>
        <div className="col-2 text-left">Quantity</div>
        <div className="col-2 text-left">Edit</div>
      </div>
      {orders.map((order, index) => (<OrderItem
        key={order.id}
        position={index + 1}
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

