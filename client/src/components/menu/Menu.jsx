import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
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
import ConnectedGreeting from '../greeting/Greeting';
import { mealActions, menuActions } from '../../redux/actions';
import ConnectedNav from '../nav/Nav';
import '../../../public/styles/bookameal.scss';
import '../../../public/styles/modalOpenButton.scss';
import '../../../public/styles/search-input.css';
import '../../../public/styles/accordion.css';

ReactModal.setAppElement(document.getElementById('root'));
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      menu: []
    };
  }
  componentDidMount() {
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
      <div className="contain">
        <header className="header">
          <ConnectedNav />
        </header>
        <main>
          <ConnectedGreeting isCaterer={isCaterer} firstName={firstName} />
          <Accordion accordion={false}>
            <AccordionItem expanded>
              <AccordionItemTitle>
                <div className="title-element flexbox">
                  <h4>
                  Your Meals
                  </h4>
                  <div className="accordion__arrow u-position-relative" role="presentation" />
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <SearchInput className="search-input input-field" onChange={this.searchUpdated} />
                <MealCardContainer
                  meals={filteredMeals}
                  MealCard={MealCard2}
                  addToMenu={this.addToMenu}
                  addClass="scroll"
                />
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle>
                <div className="title-element flexbox wrap">
                  <h3>
          Today&#39;s Menu
                  </h3>
                  <div className="accordion__arrow u-position-relative" role="presentation" />
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div className="title-element flexbox">
                  <button className="btn title-button" onClick={this.postMenu}>
                    <p>Post Menu</p>
                  </button>
                  <button className="title-button btn" onClick={() => this.setState({ menu: [] })}>
                    <p>Clear Menu</p>
                  </button>
                </div>

                <MealCardContainer
                  meals={this.state.menu}
                  MealCard={MealCard2}
                  removeFromMenu={this.removeFromMenu}
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
Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export { Menu };
export default connect(mapStateToProps)(Menu);
