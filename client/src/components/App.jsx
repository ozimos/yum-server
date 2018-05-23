import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InputPreview from './presentational/InputPreview.jsx';
import action from '../redux/actions/action';
import setMessage from '../redux/actions/message';
// import '../styles/App.css';

function App(props) {
  // props.action();
  const { message } = props;
  const changeAction = (value) => {
    props.setMessage(value);
  };
  return (
    <div className="App">
      <InputPreview value={message} onChange={changeAction} />
      <h3> some large text for testing</h3>
      <Link to="/about">
        <button>Go To About</button>
      </Link>
    </div>

  );

}
App.propTypes = {
  // action: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  message: PropTypes.number.isRequired
};
export default connect(state => state, { action, setMessage })(hot(module)(App));