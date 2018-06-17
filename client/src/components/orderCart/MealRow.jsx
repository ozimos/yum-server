import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

const MealRow = ({ id, title, price, quantity, setQuantity, removeFromCart }) => {
  const subTotal = price * (quantity || 1);
  return (
    <React.Fragment>
      <tr>
        <td>
          <button className="btn title-button icon" onClick={() => removeFromCart(id)}>
                &#10006;
          </button>
        </td>
        <td>{title}</td>
        <td>{price}</td>
        <td>
          <input
            className="formControl"
            type="number"
            placeholder="1"
            onChange={event => setQuantity(event, id)}
            value={quantity}
            style={{ width: '40px' }}
          />
        </td>
        <td>{subTotal}</td>
      </tr>
    </React.Fragment>
  );
};

MealRow.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.oneOfType(PropTypes.string, PropTypes.number).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  setQuantity: PropTypes.func.isRequired,
};
export default hot(module)(MealRow);
