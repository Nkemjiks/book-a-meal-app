import React, { Fragment } from 'react';
import CartContent from './CartContent';

/**
 * display the menu for the day
 *
 * @param {array} selectedMeal contains the meals that have been selected by the user
 * @param {Function} getQuantity collect the quantity of that particular meal
 * @param {Function} removeMealFromCart remove a meal from the cart
 *
 * @returns {JSX} JSX representation of component
 */
const Cart = ({ selectedMeal, getQuantity, removeMealFromCart }) => (
  selectedMeal.map(meal => (
    <Fragment key={meal.mealId}>
      <CartContent
        meal={meal}
        getQuantity={getQuantity}
        removeMealFromCart={removeMealFromCart}
      />
    </Fragment>
  ))
);

export default Cart;
