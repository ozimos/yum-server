import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import SearchInput, { createFilter } from 'react-search-input';
import MealCard2 from '../mealCard/MealCard2';
import MealCardContainer from '../mealCard/MealCardContainer';
import Greeting from '../greeting/Greeting';
import { mealActions, menuActions } from '../../redux/actions';
import Nav from '../nav/Nav';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';
import '../../../public/styles/modalOpenButton.scss';
import '../../../public/styles/search-input.css';

ReactModal.setAppElement(document.getElementById('root'));
export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      menu: []
    };
  }
  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.dispatch(push('/login'));
    }
    this.props.dispatch(mealActions.getAllMeals());
  }

  addToMenu = (meal) => {
    const inMenu = this.state.menu.some(elem => elem.id === meal.id);
    if (!inMenu) { this.setState(prevState => ({ menu: [...prevState.menu, meal] })); }
  }
  removeFromMenu = id =>
    this.setState(prevState =>
      ({ menu: prevState.menu.filter(elem => elem.id !== id) }));
  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }
  postMenu = () => {
    const mealIdArray = this.state.menu.map(meal => meal.id);
    this.props.dispatch(menuActions.postMenu({ meals: mealIdArray }));
  }

  render() {
    const KEYS_TO_FILTERS = ['id', 'title', 'description', 'price'];

    const filteredMeals = this.props.meals
      .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    const { isCaterer, firstName } = this.props.user;
    return (
      <div className="container">
        <header className="header">
          <Nav />
        </header>
        <main>
          <Greeting isCaterer={isCaterer} firstName={firstName} />
          <Accordion>
            <AccordionItem>
              <AccordionItemTitle>
                <div className="title-element flexbox">
                  <h3>
          Your Meals
                  </h3>
                  <div className="form-box flex">
                    <SearchInput className="search-input" onChange={this.searchUpdated} />
                  </div>
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div className="flexbox wrap">
                  <div className="flexbox" >
                    <MealCardContainer
                      meals={filteredMeals}
                      MealCard={MealCard2}
                      addToMenu={this.addToMenu}
                    />
                  </div>
                </div>
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle>
                <div className="title-element flexbox wrap">
                  <h3>
          Today&#39;s Menu
                  </h3>
                  <div className="flexbox">
                    <button className="btn title-button" onClick={this.postMenu}>
                      <p>Post Menu</p>
                    </button>
                    <button className="title-button btn" onClick={() => this.setState({ menu: [] })}>
                      <p>Clear Menu</p>
                    </button>
                  </div>
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <MealCardContainer
                  meals={this.state.menu}
                  MealCard={MealCard2}
                  removeFromMenu={this.removeFromMenu}
                />
              </AccordionItemBody>
            </AccordionItem>

          </Accordion>
        </main>
      </div>
    );
  }
}
Menu.defaultProps = {
  authenticated: false,
};
Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    isCaterer: PropTypes.bool,
    firstName: PropTypes.string
  }).isRequired,
};
const mapStateToProps = state => ({
  mealError: state.mealsReducer.mealError,
  connecting: state.mealsReducer.connecting,
  deleted: state.mealsReducer.deleted,
  meals: state.mealsReducer.meals,
  authenticated: state.loginReducer.authenticated,
  user: state.loginReducer.user.data
});


export default connect(mapStateToProps)(hot(module)(Menu));
