import React from 'react';
// import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

function About() {
  return (
    <div>
      About
      {/* <Link to="/">
      </Link> */}
      <button>Go Home</button>

      <h2> some gargantuan text for testing</h2>
    </div>
  );
}

export default connect(state => state)(hot(module)(About));
export { About };
