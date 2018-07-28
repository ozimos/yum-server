import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import SearchInput, { createFilter } from 'react-search-input';
import { push } from 'react-router-redux';
import Formsy from 'formsy-react';
import MyFormsyInput from '../helpers/MyInput';
import MealCard from '../mealCard/MealCard';
import MyFormsyTextArea from '../helpers/MyTextArea';
import ProgressLoader from '../helpers/ProgressLoader';
import MealCardContainer from '../mealCard/MealCardContainer';
import ConnectedGreeting from '../greeting/Greeting';
import { mealActions } from '../../redux/actions';
import ConnectedNav from '../nav/Nav';
import imageUpload from '../../services/imageUpload';
import '../../../public/styles/search-input.css';
import '../../../public/styles/bookameal.scss';
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
      uploading: false,
      uploadPercent: 0
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.setUploadPercent = this.setUploadPercent.bind(this);
  }
  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.dispatch(push('/login'));
    }
    this.props.dispatch(mealActions.getAllMeals());
  }
  setUploadPercent(percentProgress) {
    this.setState({ uploadPercent: percentProgress });
  }
  handleDrop(files) {
    this.setState({ uploading: true });
    imageUpload(files, this.setUploadPercent).then((response) => {
      const { data } = response;
      const fileURL = data.secure_url;
      this.urlInput.props.setValue(fileURL);
      this.setState({ displayImage: fileURL, uploading: false, uploadPercent: 0 });

    });
  }
  handleOpenModal = () =>
    this.setState({ showModal: true });
  handleCloseModal = () =>
    this.setState({ showModal: false, displayImage: '' });
  handleSubmit = async (meal) => {
    await this.props.dispatch(mealActions.createMeal(meal));
    this.setState({ displayImage: '' });
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
          <div className="title flexbox">
            <h5 className="shrink">
              Your Meals
            </h5>
            <div className="flexbox">
              <p className="info-spacer">Click on a meal title to edit the meal or</p>
              <button className="btn title-button" onClick={this.handleOpenModal}>
                <p>Add Meal</p>
              </button>
            </div>
          </div>
          <SearchInput className="search-input input-field" onChange={this.searchUpdated} />

          <MealCardContainer
            meals={filteredMeals}
            MealCard={MealCard}
            addClass="scroll2"
            connecting={this.props.connecting}
          />
        </main>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Input Modal"
          className="modal-content"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
        >
          <div className="title flexbox">
            <h4 className="shrink">
              Meal Editor
            </h4>
            <div className="flexbox">
              <button className="btn title-button" onClick={this.handleCloseModal}>
                &#10006;
              </button>
            </div>
          </div>
          <Formsy
            className="form3"
            onValidSubmit={this.handleSubmit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            ref={(form) => { this.formEl = form; }}
          >
            <MyFormsyInput
              typeOfInput="text"
              name="title"
              required
              placeholder="Meal Title"
              validations="minLength:1"
              validationError="Please enter the meal title"
            />
            <MyFormsyInput
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
            <MyFormsyTextArea
              name="description"
              required
              placeholder="Description"
            />

            <MyFormsyInput
              ref={(urlInput) => { this.urlInputMain = urlInput; }}
              innerRef={(c) => { this.urlInput = c; }}
              style={{ display: 'none' }}
              required
              typeOfInput="url"
              name="imageUrl"
              validations="minLength:5"
              validationError="Please select an image"
            />
          </Formsy>
          <Dropzone
            onDrop={this.handleDrop}
            multiple
            accept="image/*"
            className="dropzone"
          >
            {!this.state.uploading &&
            <button className="btn"> Select an Image</button>}
          </Dropzone>
          {this.state.uploading &&
          <ProgressLoader upload={this.state.uploadPercent} />
                  }
          <div id="meal_image">
            {this.state.displayImage ? <img src={this.state.displayImage} alt="meal" className="fluid-img" /> : false}
          </div>
          <button
            className={(this.state.canSubmit || !this.props.connecting) ? 'btn' : 'btn btn-disabled'}
            onClick={() => this.formEl.submit()}
            type="submit"
            disabled={!this.state.canSubmit || this.props.connecting}
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
  connecting: false,
};
MealManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  connecting: PropTypes.bool,
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

export default connect(mapStateToProps)(MealManager);
