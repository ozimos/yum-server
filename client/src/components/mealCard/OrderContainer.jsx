import React from 'react';
import PropTypes from 'prop-types';

const OrderContainer = ({ OrderItem, orders, ...props }) =>
  (
    <div className="mx_1">
      <div className="row" style={{ borderBottom: '1px solid' }}>
        <div className="col s1 text_left">No</div>
        <div className="col s5 text_left">Meal Title</div>
        <div className="col s2 text_left">Price (&#x20a6;)</div>
        <div className="col s2 text_left">Quantity</div>
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

