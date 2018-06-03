import { withFormsy, propTypes } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

class MyTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {

    this.props.setValue(event.currentTarget.value);
  }

  render() {
    const errorMessage = this.props.getErrorMessage();

    return (
      <React.Fragment>
        <textarea
          onChange={this.changeValue}
          value={this.props.getValue() || ''}
          placeholder={this.props.placeholder}
        />
        <div
          style={{
            color: 'red', fontSize: '1rem'
          }}
        >
          {errorMessage}
        </div>
      </React.Fragment>
    );
  }
}
MyTextArea.defaultProps = {
  placeholder: ''
};
MyTextArea.propTypes = {
  placeholder: PropTypes.string,
  ...propTypes
};
export default withFormsy(MyTextArea);