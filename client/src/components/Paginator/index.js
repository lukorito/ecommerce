import React from 'react';
import { Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Paginator= ({pageChange, totalPages}) => (
  <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    siblingRange={1}
    totalPages={totalPages}
    onPageChange={pageChange}
  />
);

Paginator.propTypes = {
  pageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Paginator;
