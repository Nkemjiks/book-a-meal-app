import React, { Fragment } from 'react';
import OrderHistoryContent from './OrderHistoryContent';

/**
 * display the order details
 *
 * @param {object} orderDetails details of all orders
 *
 * @returns {JSX} JSX representation of component
 */
const OrderHistoryList = ({ orderDetails }) => (
  orderDetails.sort((a, b) => a.createdAt < b.createdAt).map(order => (
    <Fragment key={order.id}>
      <OrderHistoryContent order={order} />
    </Fragment>
  ))
);

export default OrderHistoryList;
