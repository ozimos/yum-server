import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      About
      <Link to="/">
        <button>Go Home</button>
      </Link>

      <h2> some gargantuan text for testing</h2>
    </div>
  );
}

export default About;