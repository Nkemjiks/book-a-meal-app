import React, { Fragment } from 'react';
import MealsAvailableComponent from './MealsAvailableComponent';

const MealsAvailableListComponent = ({ meals, addMealIdToArray, mealsInMenuId }) => (
  meals.sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase();
  }).map(meal => (
    <Fragment key={meal.id}>
      <MealsAvailableComponent
        meal={meal}
        addMealIdToArray={addMealIdToArray}
        mealsInMenuId={mealsInMenuId}
      />
    </Fragment>
  ))
);

export default MealsAvailableListComponent;
