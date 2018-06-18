import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import SearchInput, { createFilter } from 'react-search-input';
import MealCard3 from '../mealCard/MealCard3';
import MealRow from '../orderCart/MealRow';
import CartContainer from '../orderCart/CartContainer';
import OrderItem from '../orderCart/OrderItem';
import MealCardContainer from '../mealCard/MealCardContainer';
import OrderContainer from '../mealCard/OrderContainer';
import Greeting from '../greeting/Greeting';
import { menuActions, orderActions } from '../../redux/actions';
import ConnectedNav from '../nav/Nav';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';
import '../../../public/styles/search-input.css';
import '../../../public/styles/accordion.css';

export class Order extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      currentOrder: [],
      currentOrderId: ''
    };
  }
  componentDidMount() {
    this.props.dispatch(menuActions.getMenu());
    this.props.dispatch(orderActions.getUserOrdersByDate());
  }
  addToOrder = (meal) => {
    const inOrder = this.state.currentOrder.some(elem => elem.id === meal.id);
    if (!inOrder) {
      this.setState(prevState =>
        ({ currentOrder: [...prevState.currentOrder, meal] }));
    }
  }
  addOrder = (id) => {
    const order = this.props.orders.find(elem => elem.id === id);
    this.setState({ currentOrder: order.Meals, currentOrderId: id });
  }
  removeFromOrder = id =>
    this.setState(prevState =>
      ({ currentOrder: prevState.currentOrder.filter(elem => elem.id !== id) }));
  clearOrder = () => this.setState({ currentOrder: [], currentOrderId: '' })
  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }
  postOrder = () => {
    const orderIdArray = this.state.currentOrder.map(meal => meal.id);
    this.props.dispatch(orderActions.postOrder({ currentOrder: orderIdArray }));
  }

  render() {
    const KEYS_TO_FILTERS = ['id', 'title', 'description', 'price'];


    const isMenuSet = this.props.menu.length !== 0;
    const isMealSelected = this.state.currentOrder.length !== 0;
    const isTodayOrder = this.props.orders.length !== 0;
    let filteredMeals;
    if (isMenuSet) {
      filteredMeals = this.props.menu
        .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    }
    const { isCaterer, firstName } = this.props.user;
    return (
      <div className="contain">
        <header className="header">
          <ConnectedNav />
        </header>
        <Greeting isCaterer={isCaterer} firstName={firstName} />
        <div className="row">
          <main className="col-12 col-md-8">
            <Accordion accordion={false}>
              <AccordionItem expanded>
                <AccordionItemTitle>
                  <div className="title-element flexbox">
                    <h3>
                  Today&#39;s Menu
                    </h3>
                    <div className="accordion__arrow u-position-relative" role="presentation" />
                  </div>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <SearchInput className="search-input" onChange={this.searchUpdated} />
                  {isMenuSet ? <MealCardContainer
                    meals={filteredMeals}
                    MealCard={MealCard3}
                    addToOrder={this.addToOrder}
                    addClass="scroll"
                  /> :
                  <div>
                  The menu for the day has not been set
                  </div>
                }
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <div className="title-element flexbox wrap">
                    <h3>
          Your Orders for Today
                    </h3>
                    <p>
                      {`Orders can only be edited up to ${process.env.ORDER_INTERVAL_HOUR || 4} hours after booking`}
                    </p>
                    <div className="accordion__arrow u-position-relative" role="presentation" />
                  </div>
                </AccordionItemTitle>
                <AccordionItemBody>
                  { isTodayOrder ? <OrderContainer
                    orders={this.props.orders}
                    OrderItem={OrderItem}
                    addOrder={this.addOrder}
                  /> :
                  <div>
                  You have not placed an order today
                  </div>
                }
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </main>
          <aside className="col-12 col-md-4" >
            {isMealSelected ? <CartContainer
              order={this.state.currentOrder}
              orderId={this.state.currentOrderId}
              MealRow={MealRow}
              removeFromCart={this.removeFromOrder}
              clearCart={this.clearOrder}
            /> :
            <div>
              <h3>Order Cart</h3>
              <p>Add a meal by clicking on a meal checkmark button</p>

            </div>
                }
          </aside>
        </div>

      </div>
    );
  }
}
Order.defaultProps = {
  menu: [],
  orders: []
};
Order.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
  menu: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    isCaterer: PropTypes.bool,
    firstName: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
};
const mapStateToProps = state => ({
  orderError: state.orderReducer.orderError,
  connecting: state.orderReducer.connecting,
  menu: state.menuReducer.menu.Meals,
  orders: state.orderReducer.orders,
  user: state.loginReducer.user.data
});


export default connect(mapStateToProps)(hot(module)(Order));
