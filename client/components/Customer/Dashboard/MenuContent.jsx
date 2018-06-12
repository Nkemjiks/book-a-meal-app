import React, { Fragment } from 'react';
import Meal from './Meal';

/**
 * view all meals in a caterer's menu
 *
 * @param {object} meals details of meals in a caterer menu
 * @param {Function} addMealToCart add meal to customer cart
 *
 * @returns {JSX} JSX representation of component
 */
const MenuContent = ({ meals, addMealToCart }) => (
  meals.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()).map(meal => (
    <Fragment key={meal.menuItems.mealId}>
      <Meal meal={meal} addMealToCart={addMealToCart} />
    </Fragment>
  ))
);

export default MenuContent;
