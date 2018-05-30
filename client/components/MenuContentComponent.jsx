import React, { Fragment } from 'react';

const MenuContentComponent = ({ meal }) => (
  <Fragment>
    <div className="meals-added">
      <div>
        <img src={meal.imageURL} alt="Meal" className="meal-image" />
      </div>
      <p id={`${meal.menuItems.mealId}name`}>{meal.name}</p>
      <p id={`${meal.menuItems.mealId}price`}>&#8358; {meal.price}</p>
    </div>
  </Fragment>
);

export default MenuContentComponent;
