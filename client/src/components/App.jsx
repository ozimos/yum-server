import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import action from '../redux/actions/action';

function App(props) {
  props.action();
  return (
    <div>Hello</div>
  );

}
App.propTypes = {
  action: PropTypes.func.isRequired,
};
export default connect(null, { action })(hot(module)(App));