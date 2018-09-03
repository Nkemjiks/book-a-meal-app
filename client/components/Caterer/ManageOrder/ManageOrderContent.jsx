import React, { Fragment } from 'react';

/**
 * display today and all order details received
 *
 * @param {object} orderDetails details of all orders
 * @param {boolean} isToday check to see if its today's order
 *
 * @returns {JSX} JSX representation of component
 */
const ManageOrderContent = ({ orderDetails, isToday }) => (
  orderDetails.sort((a, b) => a.createdAt < b.createdAt).map(order => (
    <Fragment key={order.id}>
      <div id="order-container">
        <div key={order.id} className="order-info">
          {
            (!isToday) &&
            <Fragment>
              <p>{order.date}</p>
              <p>{order.time}</p>
            </Fragment>
          }
          <p>{order.user.fullName}</p>
          <p>{order.user.phoneNumber}</p>
          <p>{order.user.email}</p>
          <p>{order.id}</p>
          {
            (order.deliveryAddress) &&
            <p>{order.deliveryAddress}</p>
          }
          {
            (!order.deliveryAddress) &&
            <p>{order.user.address}</p>
          }
        </div>
        <hr />
        {
            order.meals.map(meal => (
              <Fragment key={meal.id}>
                <p><strong>{meal.name}</strong> - {meal.quantity} plate(s)</p>
              </Fragment>
            ))
          }
      </div>
    </Fragment>
  ))
);

export default ManageOrderContent;
