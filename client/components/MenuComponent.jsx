import React, { Fragment } from 'react';
import MenuContentComponent from './MenuContentComponent';

const MenuComponent = ({ menu }) => (
  menu.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()).map(meal => (
    <Fragment key={meal.menuItems.mealId}>
      <MenuContentComponent meal={meal} />
    </Fragment>
  ))
);

export default MenuComponent;
