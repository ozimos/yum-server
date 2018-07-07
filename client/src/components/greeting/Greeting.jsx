import React from 'react';
import PropTypes from 'prop-types';

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
export default Greeting;
