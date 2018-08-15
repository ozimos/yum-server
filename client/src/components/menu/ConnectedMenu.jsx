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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchInput, { createFilter } from 'react-search-input';
import MealDisplayCard from '../mealCard/MealDisplayCard';
import MealCardContainer from '../mealCard/MealCardContainer';
import Greeting from '../greeting/Greeting';
import { mealActions, menuActions } from '../../redux/actions';
import ConnectedNav from '../nav/ConnectedNav';
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
      menu: [],
      dbMenu: []
    };
    this.addToMenu = this.addToMenu.bind(this);
    this.postMenu = this.postMenu.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let incomingMenu = [];
    let prevMenu = [];
    if (prevState.dbMenu) {
      prevMenu = prevState.dbMenu.map(meal => meal.id);
    }
    if (nextProps.menu) {
      incomingMenu = nextProps.menu.map(meal => meal.id);
    }
    const incomingMenuSet = new Set(incomingMenu);
    const difference = prevMenu.filter(x => !incomingMenuSet.has(x));
    if (difference.length > 0) {
      const newMenu = [...nextProps.menu];
      newMenu
        .forEach((meal) => { delete meal.MealMenus; });
      return {
        dbMenu: nextProps.menu,
        menu: newMenu };
    }
    return null;
  }
  async componentDidMount() {
    this.props.dispatch(mealActions.getAllMeals());
    await this.props.dispatch(menuActions.getMenu());
    const newMenu = [...this.props.menu];
    newMenu
      .forEach((meal) => { delete meal.MealMenus; });
    // eslint-disable-next-line
     this.setState({ menu: newMenu, dbMenu: this.props.menu });
  }

  addToMenu(meal) {
    const inMenu = this.state.menu.some(elem => elem.id === meal.id);
    if (!inMenu) {
      this.setState(prevState => ({ menu: [...prevState.menu, meal] }));
      toast.success('Meal has been added to menu', { className: 'toaster' });
    } else {
      toast.error('Meal is already in menu', { className: 'toaster' });
    }
  }

  removeFromMenu = id =>
    this.setState(prevState =>
      ({ menu: prevState.menu.filter(elem => elem.id !== id) }));
  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }
  postMenu() {
    const mealIdArray = this.state.menu.map(meal => meal.id);
    this.props.dispatch(menuActions.postMenu({ meals: mealIdArray }));
    toast.success('Menu for the day has been posted', { className: 'toaster' });
  }

  render() {
    const KEYS_TO_FILTERS = ['id', 'title', 'description', 'price'];

    const filteredMeals = this.props.meals
      .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    const { isCaterer, firstName } = this.props.user;
    const isMenuSet = this.state.menu.length !== 0;

    return (
      <div className="contain">
        <header className="header">
          <ConnectedNav />
        </header>
        <main>
          <ToastContainer autoClose={2000} />

          <Greeting isCaterer={isCaterer} firstName={firstName} />
          <Accordion accordion>
            <AccordionItem expanded>
              <AccordionItemTitle>
                <div className="title-element flexbox">
                  <h5>
                  Your Meals
                  </h5>
                  <div
                    className="accordion__arrow u-position-relative"
                    role="presentation"
                  />
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <SearchInput
                  className="search-input input-field"
                  onChange={this.searchUpdated}
                />
                <MealCardContainer
                  meals={filteredMeals}
                  MealCard={MealDisplayCard}
                  collection="Menu"
                  addToCollection={this.addToMenu}
                  addClass="scroll"
                />
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle>
                <div className="title-element flexbox wrap">
                  <h5>
          Today&#39;s Menu
                  </h5>
                  <div
                    className="accordion__arrow u-position-relative"
                    role="presentation"
                  />
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <div className="title-element flexbox">
                  <button className="btn title-button" onClick={this.postMenu}>
                    <p>Post Menu</p>
                  </button>
                  <button
                    className="title-button btn"
                    onClick={() => this.setState({ menu: [] })
                  }
                  >
                    <p>Clear Menu</p>
                  </button>
                </div>

                {
                  isMenuSet ?
                    <MealCardContainer
                      meals={this.state.menu}
                      MealCard={MealDisplayCard}
                      collection="Menu"
                      removeFremoveFromCollectionromMenu={this.removeFromMenu}
                      addClass="scroll"
                    /> :
                    <div className="menu-message">
                  `You have not added meals to the menu.
                   Select a meal from the meal section
                   above to add meal to menu.`
                    </div>
                 }
              </AccordionItemBody>
            </AccordionItem>

          </Accordion>
        </main>
      </div>
    );
  }
}
Menu.defaultProps = {
  menu: []
};
Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  menu: PropTypes.arrayOf(PropTypes.object),
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
  menu: state.menuReducer.menu.Meals,
  authenticated: state.loginReducer.authenticated,
  user: state.loginReducer.user.data
});

export { Menu };
export default connect(mapStateToProps)(Menu);
