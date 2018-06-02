import React, { Fragment } from 'react';
import CartContentComponent from './CartContentComponent';

const CartComponent = ({ selectedMeal, getQuantity, removeMealFromCart }) => (
  selectedMeal.map(meal => (
    <Fragment key={meal.mealId}>
      <CartContentComponent
        meal={meal}
        getQuantity={getQuantity}
        removeMealFromCart={removeMealFromCart}
      />
    </Fragment>
  ))
);

export default CartComponent;
