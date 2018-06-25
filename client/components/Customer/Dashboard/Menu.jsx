import React, { Fragment } from 'react';
import MenuContent from './MenuContent';

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
    a.caterer.fullName.toLowerCase() > b.caterer.fullName.toLowerCase()).map(menu => (
      <Fragment key={menu.id}>
        <h3>Caterer: { menu.caterer.fullName }</h3>
        <MenuContent meals={menu.meals} addMealToCart={addMealToCart} />
      </Fragment>
  ))
);

export default Menu;
