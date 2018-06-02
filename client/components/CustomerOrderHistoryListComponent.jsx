import React, { Fragment } from 'react';
import CustomerOrderHistoryComponent from './CustomerOrderHistoryComponent';

const CustomerOrderHistoryListComponent = ({ orderDetails }) => (
  orderDetails.sort((a, b) => a.createdAt < b.createdAt).map(order => (
    <Fragment key={order.id}>
      <CustomerOrderHistoryComponent order={order} />
    </Fragment>
  ))
);

export default CustomerOrderHistoryListComponent;
