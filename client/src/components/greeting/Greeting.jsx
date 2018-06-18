import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

const Greeting = props =>
  (
    <div>
      <h3>
                Welcome {props.isCaterer ? 'Caterer' : 'Customer'} {props.firstName}
      </h3>
    </div>
  );
Greeting.propTypes = {
  isCaterer: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired
};
export { Greeting };
export default hot(module)(Greeting);
