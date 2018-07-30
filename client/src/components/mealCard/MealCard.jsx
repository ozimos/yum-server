import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import Dropzone from 'react-dropzone';
import MyFormsyInput from '../helpers/MyInput';
import MyFormsyTextArea from '../helpers/MyTextArea';
import ProgressLoader from '../helpers/ProgressLoader';
import { mealActions } from '../../redux/actions';
import imageUpload from '../../services/imageUpload';

ReactModal.setAppElement(document.getElementById('root'));
class PlainMealCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      showModal: false,
      showModal2: false,
      displayImage: this.props.imageUrl,
      uploading: false,
      uploadPercent: 0
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.setUploadPercent = this.setUploadPercent.bind(this);
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
    this.setState({ showModal: false });
    handleOpenModal2 = () =>
      this.setState({ showModal2: true });
  handleCloseModal2 = () =>
    this.setState({ showModal2: false });
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
            <button className="modal-open modal-trigger" onClick={this.handleOpenModal}>
              {title}
            </button>
            <button className="btn title-button icon" onClick={this.handleOpenModal2}>
                &#10006;
            </button>
          </div>
        </div>
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
            <button className="btn title-button" onClick={this.handleCloseModal}>
                &#10006;
            </button>
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
              placeholder={title || 'Meal Title'}
              validations={{ minLength: 1, maxLength: 48 }}
              validationError="Please enter the meal title"
              validationErrors={{
                minLength: 'input must be longer than 1 character',
                maxLength: 'input must be shorter than 50 characters',
              }}
            />
            <MyFormsyInput
              typeOfInput="number"
              name="price"
              placeholder={`\u20A6${price}` || 'Price'}
              validations={{
                  isOnlyInt: (values, value = '') => /^(\s?|[1-9]\d*)$/.test(value),
                  minLength: 1,
                  maxLength: 48
                }}
              validationError="Please enter a price"
              validationErrors={{
                isOnlyInt: 'price must be integer',
                minLength: 'input must be longer than 1 character',
                maxLength: 'input must be shorter than 50 characters',
              }}
            />
            <MyFormsyTextArea
              name="description"
              placeholder={description || 'Description'}
              validations={{ minLength: 5, maxLength: 98 }}
              validationErrors={{
                minLength: 'input must be longer than 5 characters',
                maxLength: 'input must be shorter than 100 characters',
              }}
            />

            <MyFormsyInput
              ref={(urlInput) => { this.urlInputMain = urlInput; }}
              innerRef={(c) => { this.urlInput = c; }}
              style={{ display: 'none' }}
              typeOfInput="url"
              name="imageUrl"
              validations={{ isUrl: true, minLength: 5, maxLength: 48 }}
              validationError="Please select an image"
              validationErrors={{
                isUrl: 'A valid url was not supplied',
                minLength: 'input must be longer than 5 characters',
                maxLength: 'input must be shorter than 50 characters',
              }}

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
            <img src={this.state.displayImage} alt="meal" className="fluid-img" />
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
        <ReactModal
          isOpen={this.state.showModal2}
          contentLabel="Confirmation Modal"
          className="modal-content"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={false}
        >
          <p>
             This action will delete your meal. Do you want to continue
          </p>
          <div className="title flexbox">
            <button
              style={{ backgroundColor: 'red !important' }}
              className="btn"
              onClick={() => { this.deleteMeal(); this.handleCloseModal2(); }}
            >
              <p>Yes</p>
            </button>
            <button
              className="btn"
              onClick={this.handleCloseModal2}
            >
              <p>No</p>
            </button>
          </div>

        </ReactModal>
      </React.Fragment>
    );
  }
}
PlainMealCard.defaultProps = {
  connecting: false,
};
PlainMealCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  connecting: PropTypes.bool,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export { PlainMealCard };
export default connect(state => state)(PlainMealCard);

