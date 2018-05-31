import React, { Fragment } from 'react';
import CartContentComponent from './CartContentComponent';

const CartComponent = ({ selectedMeal, getQuantity }) => (
  selectedMeal.map(meal => (
    <Fragment key={meal.mealId}>
      <CartContentComponent meal={meal} getQuantity={getQuantity} />
    </Fragment>
  ))
);

export default CartComponent;
