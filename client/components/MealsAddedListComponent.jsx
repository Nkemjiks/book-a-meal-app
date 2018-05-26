import React, { Fragment } from 'react';
import MealsAddedComponent from './MealsAddedComponent';

const MealAddedListComponent = ({ meals }) => (
  meals.map(meal => (
    <Fragment key={meal.id}>
      <MealsAddedComponent meal={meal} />
    </Fragment>
  ))
);

export default MealAddedListComponent;
