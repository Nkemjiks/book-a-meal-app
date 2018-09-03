import React, { Fragment } from 'react';
import OrderHistoryContent from './OrderHistoryContent';

/**
 * display the order details
 *
 * @param {object} orderDetails details of all orders
 *
 * @returns {JSX} JSX representation of component
 */
export const OrderHistoryList = ({ orderDetails }) => (
  orderDetails.sort((a, b) => new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()).map(order => (
      <Fragment key={order.id}>
        <OrderHistoryContent order={order} />
      </Fragment>
  ))
);

export default OrderHistoryList;
