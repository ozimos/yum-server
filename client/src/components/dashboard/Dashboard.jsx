import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import SearchInput, { createFilter } from 'react-search-input';
import HotGreeting from '../greeting/Greeting';
import { dashboardActions } from '../../redux/actions';
import ConnectedNav from '../nav/Nav';
import uniqueUsers from '../../utils/uniqueUsers';
import cashTotal, { subTotal } from '../../utils/cashTotal';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/dashboard.scss';

ReactModal.setAppElement(document.getElementById('root'));

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }
  componentDidMount() {
    this.props.dispatch(dashboardActions.getOrdersByDate());
  }


  render() {
    const KEYS_TO_FILTERS = ['id', 'userId', 'updatedAt'];
    const isTodayOrder = this.props.orders.length !== 0;
    let filteredOrders;
    if (isTodayOrder) {
      filteredOrders = this.props.orders
        .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    }
    const { isCaterer, firstName } = this.props.user;

    return (
      <div className="canvas">
        <div className="container3">

          <header className="header extra">
            <ConnectedNav />
          </header>
          <main>
            <HotGreeting isCaterer={isCaterer} firstName={firstName} />

            <div className="summary">
              <h3>Summary</h3>
              <div className="flexbox">
                <h4>Orders
                  <span className="bg-blue">{this.props.orders.length}</span>
                </h4>
                <h4>Customers
                  <span className="bg-blue">{uniqueUsers(this.props.orders)}</span>
                </h4>
                <h4>Total Sales
                  <span className="bg-blue">&#8358; {cashTotal(this.props.orders)}</span>
                </h4>
              </div>

            </div>
            <Accordion accordion={false}>
              <AccordionItem expanded>
                <AccordionItemTitle>
                  <div className="title flexbox">
                    <h3>
                Order List
                    </h3>
                    <p className="shrink">
                Click Order Id To View Details
                    </p>
                    <div className="flexbox" />
                  </div>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <SearchInput className="search-input" onChange={this.searchUpdated} />
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Total Amount(&#x20a6;)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map(order => (
                          <tr key={order.id}>
                            <td><p className="modal-trigger">{order.id}</p></td>
                            <td><p>{subTotal(order.Meals)}</p></td>
                            <td><p>Pending</p></td>
                          </tr>
                        ))
                      }
                      </tbody>
                    </table>
                  </div>
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </main>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    isCaterer: PropTypes.bool,
    firstName: PropTypes.string
  }).isRequired,
};
const mapStateToProps = state => ({
  user: state.loginReducer.user.data,
  meals: state.mealsReducer.meals,
  orders: state.dashboardReducer.orders,
  authenticated: state.loginReducer.authenticated,
});
export { Dashboard };
export default connect(mapStateToProps)(hot(module)(Dashboard));
