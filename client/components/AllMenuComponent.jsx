import React, { Fragment } from 'react';
import AllMenuContentComponent from './AllMenuContentComponent';

const AllMenuComponent = ({ allMenu, addMealToCart }) => (
  allMenu.sort((a, b) =>
    a.caterer.fullName.toLowerCase() > b.caterer.fullName.toLowerCase()).map(menu => (
      <Fragment key={menu.id}>
        <h3>Caterer: { menu.caterer.fullName }</h3>
        <AllMenuContentComponent meals={menu.meals} addMealToCart={addMealToCart} />
      </Fragment>
  ))
);

export default AllMenuComponent;
