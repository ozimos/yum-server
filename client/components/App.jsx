import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import action from '../actions/action';

function App(props) {
// eslint-disable-next-line react/prop-types
  props.action();
  return (
    <div>Hello</div>
  );

}
export default connect(null, { action })(hot(module)(App));