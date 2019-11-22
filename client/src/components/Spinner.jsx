import React from 'react';
import { Dimmer, Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Spinner = ({isLoading}) => (
  <Dimmer page active={isLoading}>
    <Loader size="medium" />
  </Dimmer>
);

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default Spinner;
