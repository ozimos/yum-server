import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import PropTypes from 'prop-types';

function InputPreview(props) {
  return (
    <div>
      <input
        type="text"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}
InputPreview.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default connect(routeNodeSelector('input-preview'))(InputPreview);