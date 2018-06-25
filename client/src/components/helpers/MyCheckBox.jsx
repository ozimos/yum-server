import { withFormsy, propTypes } from 'formsy-react';
import React from 'react';

class MyCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {

    this.props.setValue(event.target.checked);
  }

  render() {

    return (
      <React.Fragment>
        <input
          onChange={this.changeValue}
          type="checkbox"
          value={this.props.getValue() || false}
        />
      </React.Fragment>
    );
  }
}

MyCheckBox.propTypes = {
  ...propTypes
};
export { MyCheckBox };
export default withFormsy(MyCheckBox);