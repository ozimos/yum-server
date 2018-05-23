import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Main from './presentational/Main.jsx';
import action from '../redux/actions/action';
import setMessage from '../redux/actions/message';
import '../styles/App.css';

function App(props) {
  // props.action();
  const { message } = props.message;
  const changeAction = (value) => {
    props.setMessage(value);
  };
  return (
    <div className="App">
      <Main value={message} onChange={changeAction} />
      <h3> some large text for testing</h3>
    </div>

  );

}
App.propTypes = {
  // action: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  message: PropTypes.number.isRequired
};
export default connect(state => ({
  message: state.message
}), { action, setMessage })(hot(module)(App));