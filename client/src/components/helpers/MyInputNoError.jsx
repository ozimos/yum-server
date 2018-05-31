import { withFormsy, propTypes } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

class MyInputNoError extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {

    this.props.setValue(event.currentTarget.value);
  }

  render() {

    return (
      <React.Fragment>
        <input
          onChange={this.changeValue}
          type={this.props.typeOfInput}
          value={this.props.getValue() || ''}
          placeholder={this.props.placeholder}
        />
      </React.Fragment>
    );
  }
}
MyInputNoError.defaultProps = {
  placeholder: ''
};
MyInputNoError.propTypes = {
  typeOfInput: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  ...propTypes
};
export default withFormsy(MyInputNoError);