import React, { Fragment } from 'react';
import MealsAdded from './MealsAdded';

/**
 * display meals added by the caterer
 *
 * @param {array} meals details of all meals
 *
 * @returns {JSX} JSX representation of component
 */
export const MealsAddedList = ({ meals }) => (
  meals.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()).map(meal => (
    <Fragment key={meal.id}>
      <MealsAdded key={meal.id} meal={meal} />
    </Fragment>
  ))
);

export default MealsAddedList;
