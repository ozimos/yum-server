import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, ProgressBar } from 'react-materialize';

const ProgressLoader = props =>
  (
    <div>
      <Row>
        <Col s={12}>
          <ProgressBar progress={props.upload} />
        </Col>
      </Row>
    </div>);

ProgressLoader.propTypes = {
  upload: PropTypes.number.isRequired,
};

export default ProgressLoader;

