import React from 'react';
import { Pagination } from 'semantic-ui-react';

const Paginator= ({pageChange}) => (
  <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    siblingRange={1}
    totalPages={11}
    onPageChange={pageChange}
  />
);

export default Paginator;
