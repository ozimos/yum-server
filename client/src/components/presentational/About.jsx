import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import '../../styles/App.css';

function About() {
  return (
    <div>
      <h2> some gargantuan text for testing</h2>
    </div>
  );
}

export default connect(routeNodeSelector('about'))(About);