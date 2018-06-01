import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mealActions } from '../../redux/actions';
import MealCardContainer from '../mealCard/MealCardContainer';
import '../../../public/styles/book_a_meal.css';

export class MealManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {
        title: '',
        description: '',
        imageUrl: '',
        price: '',
      }
      // submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const { name, value } = event.target;
    const { meal } = this.state;
    this.setState({
      meal: {
        ...meal,
        [name]: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    // this.setState({ submitted: true });
    const { meal } = this.state;
    const { dispatch } = this.props;
    if (meal.title && meal.description && meal.imageUrl && meal.price) {
      dispatch(mealActions.create(meal));
    }
  }
  render() {
    return (
      <div className="container">
        <header className="header">
          <nav className="flexbox">
            <h2 className="shrink heading">Book A Meal</h2>
            <div className="flexbox nowrap">
              <a href="menu_editor.html">
                Menu

              </a>
              <a href="order_report.html">
                Orders

              </a>
              <a href="meal_booking.html">
                Meal Booking

              </a>
              <Link to="/login">
                Log Out

              </Link>
            </div>
          </nav>
        </header>
        <main>
          <div>
            <h3>Welcome Caterer Sanni</h3>
          </div>
          <div className="title flexbox">
            <h3 className="shrink">
              Your Meals
            </h3>
            <div className="flexbox nowrap">
              <p>Click on a meal title to edit the meal or</p>
              <button className="title-button modal-trigger">
                <p>Add Meal</p>
              </button>
            </div>
          </div>
          <MealCardContainer />
        </main>
      </div>
    );
  }
}
MealManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect(state => state)(hot(module)(MealManager));
