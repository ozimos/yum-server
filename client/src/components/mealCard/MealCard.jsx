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
    this.props.dispatch(mealActions.updateMeal(meal));
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
    const { title, imageUrl } = this.props;
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
                placeholder="Meal Title"
                validations="minLength:1"
                validationError="Please enter the meal title"
                required
              />
              <MyInput
                typeOfInput="text"
                name="price"
                placeholder="Price"
                validations="minLength:1"
                validationError="Please enter the meal price"
                required
              />
              <MyTextArea
                name="description"
                placeholder="Description"
              />
              <p>Select a meal image</p>
              <MyInput
                typeOfInput="file"
                name="imageUrl"
                validations="minLength:5"
                validationError="Please select an image"
                required
              />
            </Formsy>
          </div>
          <div id="meal_image">
            <img src="http://res.cloudinary.com/tovieyeozim/image/upload/c_scale,w_300/v1527864569/salmon-1312372_640.jpg" alt="meal" className="fluid-img" />
          </div>
          <button
            className={this.state.canSubmit ? 'btn title-button' : 'btn btn-disabled title-button'}
            form={this.formEl}
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
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(state => state)(hot(module)(MealCard));

