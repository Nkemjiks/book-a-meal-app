import React, { Fragment } from 'react';
import MenuContent from './MenuContent';

/**
 * display menu set by the caterer
 *
 * @param {array} menu details of menu
 *
 * @returns {JSX} JSX representation of component
 */
const MenuList = ({ menu, removeMealFromMenu }) => (
  menu.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()).map(meal => (
    <Fragment key={meal.menuItems.mealId}>
      <MenuContent meal={meal} removeMealFromMenu={removeMealFromMenu} />
    </Fragment>
  ))
);

export default MenuList;
