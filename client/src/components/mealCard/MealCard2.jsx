import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { mealActions } from '../../redux/actions';

ReactModal.setAppElement(document.getElementById('root'));
class PlainMealCard2 extends React.Component {
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
            <button className="modal-open modal-trigger" onClick={this.handleOpenModal}>
              {title}
            </button>
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
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Input Modal"
          className="modal-content"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
        >
          <div className="flexbox">
            <h4 className="shrink">
              Meal Details
            </h4>
            <div className="flexbox">
              <button className="btn title-button" onClick={this.handleCloseModal}>
                &#10006;
              </button>
            </div>
          </div>
          <div className="menu-info">
            <div>{title}</div>
            <div>{description}</div>
            <div>&#x20a6;{price}</div>
          </div>
        </ReactModal>
      </React.Fragment>
    );
  }
}
PlainMealCard2.defaultProps = {
  addToMenu: null,
  removeFromMenu: null,
};
PlainMealCard2.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  addToMenu: PropTypes.func,
  removeFromMenu: PropTypes.func,
};
export { PlainMealCard2 };
export default connect(state => state)(PlainMealCard2);

