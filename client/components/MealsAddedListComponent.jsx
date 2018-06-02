import React, { Fragment } from 'react';
import MealsAddedComponent from './MealsAddedComponent';

const MealAddedListComponent = ({ meals }) => (
  meals.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()).map(meal => (
    <Fragment key={meal.id}>
      <MealsAddedComponent meal={meal} />
    </Fragment>
  ))
);

export default MealAddedListComponent;
