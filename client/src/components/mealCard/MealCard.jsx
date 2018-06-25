/* global cloudinary */
import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import MyFormsyInput from '../helpers/MyInput';
import MyFormsyTextArea from '../helpers/MyTextArea';
import { mealActions } from '../../redux/actions';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';
import '../../../public/styles/modalOpenButton.scss';

ReactModal.setAppElement(document.getElementById('root'));
class MealCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      showModal: false,
      displayImage: this.props.imageUrl
    };
  }
  uploadWidget = () => {
    cloudinary.openUploadWidget(
      { cloud_name: 'tovieyeozim', upload_preset: 'u9zfzeap', tags: [this.props.id] },
      (error, result) => {
        this.setState({ displayImage: result[0].secure_url });
        this.urlInput.props.setValue(result[0].secure_url);
      }
    );
  }
  handleOpenModal = () =>
    this.setState({ showModal: true });
  handleCloseModal = () =>
    this.setState({ showModal: false });
  deleteMeal = () =>
    this.props.dispatch(mealActions.deleteMeal(this.props.id));

  handleSubmit = async (meal) => {
    await this.props.dispatch(mealActions.updateMeal(meal, this.props.id));
    this.handleCloseModal();
  }
  disableButton = () =>
    this.setState({ canSubmit: false });

  enableButton = () =>
    this.setState({ canSubmit: true });
  serverFeedback = error =>
    this.formEl.updateInputsWithError(error);
  render() {
    const { title, imageUrl, price, description } = this.props;

    return (
      <React.Fragment>
        <div className="card">
          <img src={imageUrl} alt="Meal" className="fluid-img" />
          <div className="title-element flexbox wrap">
            <button className="modal-open shrink modal-trigger" onClick={this.handleOpenModal}>
              {title}
            </button>
            <div className="flexbox">
              <button className="btn title-button icon" onClick={this.deleteMeal}>
                &#10006;
              </button>
            </div>

          </div>
        </div>
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
              <MyFormsyInput
                typeOfInput="text"
                name="title"
                placeholder={title || 'Meal Title'}
                validations="minLength:1"
                validationError="Please enter the meal title"
              />
              <MyFormsyInput
                typeOfInput="number"
                name="price"
                placeholder={price || 'Price'}
                validations={{
                  isOnlyInt: (values, value = '') => /^(\s?|[1-9]\d*)$/.test(value)
                }}
                validationError="Please enter a price"
                validationErrors={{ isOnlyInt: 'price must be integer' }}
              />
              <MyFormsyTextArea
                name="description"
                placeholder={description || 'Description'}
              />

              <MyFormsyInput
                ref={(urlInput) => { this.urlInputMain = urlInput; }}
                innerRef={(c) => { this.urlInput = c; }}
                style={{ display: 'none' }}
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
            <img src={this.state.displayImage} alt="meal" className="fluid-img" />
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
      </React.Fragment>
    );
  }
}
MealCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export { MealCard };
export default connect(state => state)(MealCard);

