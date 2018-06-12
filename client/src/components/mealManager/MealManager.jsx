/* global cloudinary */
import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-search-input';
import { push } from 'react-router-redux';
import Formsy from 'formsy-react';
import MyInput from '../helpers/MyInput';
import MealCard from '../mealCard/MealCard';
import MyTextArea from '../helpers/MyTextArea';
import MealCardContainer from '../mealCard/MealCardContainer';
import Greeting from '../greeting/Greeting';
import { mealActions } from '../../redux/actions';
import Nav from '../nav/Nav';
import '../../../public/styles/search-input.css';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';
import '../../../public/styles/modalOpenButton.scss';

ReactModal.setAppElement(document.getElementById('root'));
export class MealManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      showModal: false,
      displayImage: '',
      searchTerm: '',
    };
  }
  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.dispatch(push('/login'));
    }
    this.props.dispatch(mealActions.getAllMeals());
  }
  handleOpenModal = () =>
    this.setState({ showModal: true });
  handleCloseModal = () =>
    this.setState({ showModal: false });
  handleSubmit = async (meal) => {
    await this.props.dispatch(mealActions.createMeal(meal));
    this.handleCloseModal();
  }
  disableButton = () =>
    this.setState({ canSubmit: false });
  enableButton = () =>
    this.setState({ canSubmit: true });
  serverFeedback = error =>
    this.formEl.updateInputsWithError(error);
    searchUpdated = (term) => {
      this.setState({ searchTerm: term });
    }
  uploadWidget = () => {
    cloudinary.openUploadWidget(
      { cloud_name: 'tovieyeozim', upload_preset: 'u9zfzeap' },
      (error, result) => {
        this.setState({ displayImage: result[0].secure_url });
        this.urlInput.props.setValue(result[0].secure_url);
      }
    );
  }

  render() {
    const KEYS_TO_FILTERS = ['id', 'title', 'description', 'price'];
    const filteredMeals = this.props.meals
      .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    const { isCaterer, firstName } = this.props.user;
    return (
      <div className="contain">
        <header className="header">
          <Nav />
        </header>
        <main>
          <Greeting isCaterer={isCaterer} firstName={firstName} />
          <div className="title flexbox">
            <h3 className="shrink">
              Your Meals
            </h3>
            <div className="flexbox nowrap">
              <p>Click on a meal title to edit the meal or</p>
              <button className="btn title-button" onClick={this.handleOpenModal}>
                <p>Add Meal</p>
              </button>
            </div>
          </div>
          <SearchInput className="search-input" onChange={this.searchUpdated} />

          <MealCardContainer
            meals={filteredMeals}
            MealCard={MealCard}
          />
        </main>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Input Modal"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
        >
          <div className="title flexbox">
            <h3 className="shrink">
              Meal Editor
            </h3>
            <div className="flexbox">
              <button className="btn title-button" onClick={this.handleCloseModal}>
                &#10006;
              </button>
            </div>
          </div>
          <div className="form-box">
            <Formsy
              className="form"
              onValidSubmit={this.handleSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              ref={(form) => { this.formEl = form; }}
            >
              <MyInput
                typeOfInput="text"
                name="title"
                required
                placeholder="Meal Title"
                validations="minLength:1"
                validationError="Please enter the meal title"
              />
              <MyInput
                typeOfInput="number"
                name="price"
                required
                placeholder="Price"
                validations={{
                  isOnlyInt: (values, value = '') => /^(\s?|[1-9]\d*)$/.test(value)
                }}
                validationError="Please enter a price"
                validationErrors={{ isOnlyInt: 'price must be integer' }}
              />
              <MyTextArea
                name="description"
                required
                placeholder="Description"
              />

              <MyInput
                ref={(urlInput) => { this.urlInputMain = urlInput; }}
                innerRef={(c) => { this.urlInput = c; }}
                style={{ display: 'none' }}
                required
                typeOfInput="url"
                name="imageUrl"
                // initialValue={this.state.displayImage}
                validations="minLength:5"
                validationError="Please select an image"
              />
            </Formsy>
          </div>
          <div>
            <button onClick={this.uploadWidget} className="btn title-button">
          Upload Photo
            </button>
          </div>
          <div id="meal_image">
            {this.state.displayImage ? <img src={this.state.displayImage} alt="meal" className="fluid-img" /> : false}
          </div>
          <button
            className={this.state.canSubmit ? 'btn title-button' : 'btn btn-disabled title-button'}
            onClick={() => this.formEl.submit()}
            type="submit"
            disabled={!this.state.canSubmit}
          >
            <p>Continue</p>
          </button>
        </ReactModal>
      </div>
    );
  }
}
MealManager.defaultProps = {
  authenticated: false,
};
MealManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  user: PropTypes.shape({
    isCaterer: PropTypes.bool,
    firstName: PropTypes.string
  }).isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = state =>
  ({ authenticated: state.loginReducer.authenticated,
    user: state.loginReducer.user.data,
    mealError: state.mealsReducer.mealError,
    connecting: state.mealsReducer.connecting,
    meals: state.mealsReducer.meals, });

export default connect(mapStateToProps)(hot(module)(MealManager));
