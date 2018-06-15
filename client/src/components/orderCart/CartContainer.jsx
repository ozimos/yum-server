import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import '../../../public/styles/book_a_meal.css';


class CartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      orderQuantity: [],
    };
  }
setQuantity = (e, id) => {

  this.setState((prevState) => {
    const oldOrder = [...prevState.orderQuantity];
    const targetMeal = oldOrder.find(meal => meal.id === id);
    targetMeal.quantity = e.target.value;
    return { orderQuantity: prevState.orderQuantity.map((meal) => {
      if (meal.id === id) { return targetMeal; }
      return meal;
    }) };
  });
};

render() {
  const { MealRow, order, ...rest } = this.props;

  return (
    <div className={rest.addClass ? `${rest.addClass}` : ''}>
      <table>
        <caption className="text-left">
      &#9776; Your Order
        </caption>
        <thead>
          <tr>
            <th>Remove Item</th>
            <th>Meal Title</th>
            <th>Price (&#x20a6;)</th>
            <th>Quantity</th>
            <th>Subtotal (&#x20a6;)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {order.map(meal => (<MealRow
            key={meal.id}
            {...meal}
            {...rest}
          />))
        }
        </tbody>
      </table>

    </div>
  );
}
}

CartContainer.defaultProps = {
  addClass: ''
};
CartContainer.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
  MealRow: PropTypes.func.isRequired,
  addClass: PropTypes.string,
};

export default hot(module)(CartContainer);

