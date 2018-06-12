import React from 'react';
import ReactModal from 'react-modal';
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
import MealCard2 from '../mealCard/MealCard2';
import MealCardContainer from '../mealCard/MealCardContainer';
import Greeting from '../greeting/Greeting';
import { menuActions, orderActions } from '../../redux/actions';
import Nav from '../nav/Nav';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';
import '../../../public/styles/modalOpenButton.scss';
import '../../../public/styles/search-input.css';
import '../../../public/styles/accordion.css';

ReactModal.setAppElement(document.getElementById('root'));
export class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      orders: []
    };
  }
  componentDidMount() {
    this.props.dispatch(menuActions.getMenu());
    this.props.dispatch(orderActions.getAllOrders());
  }

  addToOrder = (order) => {
    const inOrder = this.state.orders.some(elem => elem.id === order.id);
    if (!inOrder) { this.setState(prevState => ({ order: [...prevState.order, order] })); }
  }
  removeFromOrder = id =>
    this.setState(prevState =>
      ({ order: prevState.orders.filter(elem => elem.id !== id) }));
  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }
  postOrder = () => {
    const orderIdArray = this.state.orders.map(order => order.id);
    this.props.dispatch(orderActions.postOrder({ orders: orderIdArray }));
  }

  render() {
    const KEYS_TO_FILTERS = ['id', 'title', 'description', 'price'];

    const filteredMeals = this.props.orders
      .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    const { isCaterer, firstName } = this.props.user;
    return (
      <div className="contain">
        <header className="header">
          <Nav />
        </header>
        <main>
          <Greeting isCaterer={isCaterer} firstName={firstName} />
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
                <MealCardContainer
                  orders={filteredMeals}
                  MealCard={MealCard2}
                  addToOrder={this.addToOrder}
                  addClass="scroll"
                />
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle>
                <div className="title-element flexbox wrap">
                  <h3>
          Your Order
                  </h3>
                  <div className="accordion__arrow u-position-relative" role="presentation" />
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div className="title-element flexbox">
                  <button className="btn title-button" onClick={this.postOrder}>
                    <p>Post Order</p>
                  </button>
                  <button className="title-button btn" onClick={() => this.setState({ order: [] })}>
                    <p>Clear Order</p>
                  </button>
                </div>

                <MealCardContainer
                  orders={this.state.order}
                  MealCard={MealCard2}
                  removeFromOrder={this.removeFromOrder}
                  addClass="scroll"
                />
              </AccordionItemBody>
            </AccordionItem>

          </Accordion>
        </main>
      </div>
    );
  }
}
Order.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    isCaterer: PropTypes.bool,
    firstName: PropTypes.string
  }).isRequired,
};
const mapStateToProps = state => ({
  orderError: state.orderReducer.orderError,
  connecting: state.orderReducer.connecting,
  deleted: state.orderReducer.deleted,
  order: state.menuReducer.data,
  user: state.loginReducer.user.data
});


export default connect(mapStateToProps)(hot(module)(Order));
