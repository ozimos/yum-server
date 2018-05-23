import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import InputPreview from './InputPreview';
import About from './About';
import NotFound from './NotFound';

function Main({ route, message, changeAction }) {
  const topRouteName = route.name.split('.')[0];

  if (topRouteName === 'input-preview') {
    return <InputPreview value={message} onChange={changeAction} />;
  }

  if (topRouteName === 'about') {
    return <About />;
  }

  return <NotFound />;
}
Main.propTypes = {
  route: PropTypes.shape({ name: PropTypes.string }).isRequired,
  changeAction: PropTypes.func.isRequired,
  message: PropTypes.number.isRequired
};
export default connect(routeNodeSelector(''))(Main);
