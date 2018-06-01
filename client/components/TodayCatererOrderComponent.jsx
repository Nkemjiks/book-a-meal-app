import React, { Fragment } from 'react';

const TodayCatererOrderComponent = ({ orderDetails }) => (
  orderDetails.map(order => (
    order.meals.map(meal => (
      <Fragment key={order.id}>
        <div key={order.id} className="order-info">
          <p>{order.user.fullName}</p>
          <p>{order.user.phoneNumber}</p>
          <p>{order.user.email}</p>
          <p>{meal.name}</p>
          <p>{meal.orderItems.quantity}</p>
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
      </Fragment>
    ))
  ))
);

export default TodayCatererOrderComponent;
