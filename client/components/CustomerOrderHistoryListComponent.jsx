import React, { Fragment } from 'react';
import CustomerOrderHistoryComponent from './CustomerOrderHistoryComponent';

const CustomerOrderHistoryListComponent = ({ orderDetails }) => (
  orderDetails.map(order => (
    <Fragment key={order.id}>
      <CustomerOrderHistoryComponent order={order} />
    </Fragment>
  ))
);

export default CustomerOrderHistoryListComponent;
