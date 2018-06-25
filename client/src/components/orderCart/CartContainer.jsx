import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderActions } from '../../redux/actions';


import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/cart_layout.scss';


class CartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderQuantity: {},
      prevPropsOrderId: this.props.orderId
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const newOrderQuantity = {};
    if (nextProps.orderId !== prevState.prevPropsOrderId) {
      nextProps.order
        .forEach((elem) => { newOrderQuantity[elem.id] = elem.MealOrders.quantity; });
      return {
        prevPropsOrderId: nextProps.orderId,
        orderQuantity: newOrderQuantity };
    }
    return null;
  }
  componentDidMount() {
    if (this.props.orderId) {
      const newOrderQuantity = {};

      this.props.order
        .forEach((elem) => { newOrderQuantity[elem.id] = elem.MealOrders.quantity; });
      // eslint-disable-next-line
      this.setState({ orderQuantity: newOrderQuantity });

    }
  }
  setQuantity = (e, id) => {
    const inputValue = e.target.value;
    this.setState(prevState =>
      ({ orderQuantity: { ...prevState.orderQuantity, [id]: inputValue } }));
  };
 placeOrder = async () => {
   const actualOrder = this.props.order
     .map(meal => ({ id: meal.id,
       quantity: this.state.orderQuantity[meal.id] || 1 }));
   if (this.props.orderId) {
     await this.props
       .dispatch(orderActions.updateOrder({ meals: actualOrder }, this.props.orderId));
   } else {
     await this.props.dispatch(orderActions.postOrder({ meals: actualOrder }));
   }
   /* eslint no-alert: off */
   if (!this.props.orderError) {
     alert('Order has been created');
     this.props.clearCart();
   }
   if (this.props.orderError) {
     alert(this.props.orderError);
   }
 }

 render() {
   const { MealRow, order, ...rest } = this.props;
   const reducer = (total, meal) => total + (meal.price * (this.state.orderQuantity[meal.id] || 1));
   const calcTotal = () => this.props.order
     .reduce(reducer, 0);
   const total = calcTotal();
   return (
     <div className={rest.addClass ? `${rest.addClass}` : ''}>
       <h3>Order Cart</h3>
       <div className="table-responsive">
         <table className="table">
           <thead>
             <tr>
               <th>Remove Item</th>
               <th>Meal Title</th>
               <th>Price (&#x20a6;)</th>
               <th>Quantity</th>
               <th>Subtotal (&#x20a6;)</th>
             </tr>
           </thead>
           <tbody>
             {order.map(meal => (<MealRow
               key={meal.id}
               {...meal}
               setQuantity={this.setQuantity}
               quantity={(this.state.orderQuantity[meal.id] || '')}
               {...rest}
             />))
        }
           </tbody>
           <caption>
             <div className="row">
               <div className="col-3 mr-auto">&#9776; Your Order</div>
               <div className="col-2"> Total </div>
               <div className="col-2"> {total}</div>
               <div className="col2">
                 <button className="btn btn-cart" onClick={rest.clearCart}>
                   <p>Clear Cart</p>
                 </button>
               </div>
               <div className="col2">
                 <button className="btn btn-cart" onClick={this.placeOrder}>
                   {this.props.orderId ? <p>Modify Order</p> : <p>Place New Order</p>}
                 </button>
               </div>
             </div>
           </caption>
         </table>
       </div>
     </div>
   );
 }
}

CartContainer.defaultProps = {
  addClass: '',
  orderError: '',
  orderId: ''
};
CartContainer.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
  MealRow: PropTypes.func.isRequired,
  addClass: PropTypes.string,
  orderId: PropTypes.string,
  orderError: PropTypes.string,
  clearCart: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  orderError: state.orderReducer.orderError,
  connecting: state.orderReducer.connecting,
});
export { CartContainer };
export default connect(mapStateToProps)(CartContainer);

