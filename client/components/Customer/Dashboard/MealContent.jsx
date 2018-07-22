import React, { Fragment } from 'react';
import Meal from './Meal';

/**
 * display the menu for the day
 *
 * @param {array} allMenu all menu for the day
 * @param {Function} addMealToCart add a meal to the cart
 *
 * @returns {JSX} JSX representation of component
 */
const Menu = ({ allMenu, addMealToCart }) => (
  allMenu.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase()).map(meal => (
      <Fragment key={meal.menuItems.mealId}>
        <Meal meal={meal} addMealToCart={addMealToCart} />
      </Fragment>
  ))
);

export default Menu;
