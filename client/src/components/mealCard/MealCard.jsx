import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import Formsy from 'formsy-react';
import MyInput from '../helpers/MyInput';
import MyTextArea from '../helpers/MyTextArea';
import { mealActions } from '../../redux/actions';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';
import '../../../public/styles/modalOpenButton.scss';

ReactModal.setAppElement('#root');
class MealCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.serverFeedback = this.serverFeedback.bind(this);
    this.formEl = null;
  }
  // fileInput = React.createRef();
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  deleteMeal() {
    this.props.dispatch(mealActions.delete(this.props.id));
  }
  handleSubmit(meal) {
    this.props.dispatch(mealActions.updateMeal(meal, this.props.id));
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }
  serverFeedback(error) {
    this.formEl.updateInputsWithError(error);
  }
  render() {
    const { title, imageUrl, price, description } = this.props;
    const cloudName = 'tovieyeozim';
    const unsignedUploadPreset = 'u9zfzeap';
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
              <button className="btn title-button close" onClick={this.handleCloseModal}>
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
                placeholder={title || 'Meal Title'}
                validations="minLength:1"
                validationError="Please enter the meal title"
              />
              <MyInput
                typeOfInput="number"
                name="price"
                placeholder={price || 'Price'}
                validations={{
                  minLength: 1,
                  isOnlyInt: (values, value) => /^[1-9]\d*$/.test(value)
                }}
                validationError="Please enter the meal price"
                validationErrors={{ isOnlyInt: 'price must be integer' }}
              />
              <MyTextArea
                name="description"
                placeholder={description || 'Description'}
              />
              {/* <button
              onClick={this.fileInput.current.click()}
               className="btn">Select a meal image</button> */}
              <MyInput
                // myRef={this.fileInput}
                // style={{ display: 'none' }}
                typeOfInput="file"
                name="imageUrl"
                validations="minLength:5"
                validationError="Please select an image"
              />
            </Formsy>
          </div>
          <div id="meal_image">
            <img src={imageUrl} alt="meal" className="fluid-img" />
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
export default connect(state => state)(hot(module)(MealCard));

