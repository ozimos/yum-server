import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { mealActions } from '../../redux/actions';
import '../../../public/styles/book_a_meal.css';
import '../../../public/styles/auth.scss';
import '../../../public/styles/modalOpenButton.scss';

ReactModal.setAppElement(document.getElementById('root'));
class MealCard2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  handleOpenModal = () =>
    this.setState({ showModal: true });
  handleCloseModal = () =>
    this.setState({ showModal: false });

  handleSubmit = async (meal) => {
    await this.props.dispatch(mealActions.updateMeal(meal, this.props.id));
    this.handleCloseModal();
  }
  render() {
    const { id, title, imageUrl, price, description } = this.props;
    const meal = { id, title, imageUrl, price, description };
    return (
      <React.Fragment>
        <div className="card">
          <img src={imageUrl} alt="Meal" className="fluid-img" />
          <div className="title-element flexbox wrap">
            <button className="modal-open shrink modal-trigger" onClick={this.handleOpenModal}>
              {title}
            </button>
            <div className="flexbox">
              {this.props.addToMenu &&
              <button className="btn title-button icon" onClick={() => this.props.addToMenu(meal)}>
                &#10004;
              </button>}
              {this.props.removeFromMenu &&
              <button className="btn title-button icon" onClick={() => this.props.removeFromMenu(id)}>
                &#10006;
              </button>}
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
              Meal Details
            </h3>
            <div className="flexbox">
              <button className="btn title-button" onClick={this.handleCloseModal}>
                &#10006;
              </button>
            </div>
          </div>
          <div className="form-box">
            <div>{title}</div>
            <div>{price}</div>
            <div>{description}</div>
            <div>{imageUrl}</div>
          </div>
        </ReactModal>
      </React.Fragment>
    );
  }
}
MealCard2.defaultProps = {
  addToMenu: null,
  removeFromMenu: null,
};
MealCard2.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  addToMenu: PropTypes.func,
  removeFromMenu: PropTypes.func,
};
export default connect(state => state)(hot(module)(MealCard2));

