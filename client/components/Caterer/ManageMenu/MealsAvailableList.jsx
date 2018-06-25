import React, { Fragment } from 'react';
import MealsAvailable from './MealsAvailable';

/**
 * display meals added by the caterer
 *
 * @param {array} meals details of all meals
 * @param {Function} addMealIdToArray add a meal to the menu
 * @param {array} mealsInMenuId details of meals already added to the menu
 *
 * @returns {JSX} JSX representation of component
 */
const MealsAvailableList = ({ meals, addMealIdToArray, mealsInMenuId }) => (
  meals.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()).map(meal => (
    <Fragment key={meal.id}>
      <MealsAvailable
        meal={meal}
        addMealIdToArray={addMealIdToArray}
        mealsInMenuId={mealsInMenuId}
      />
    </Fragment>
  ))
);

export default MealsAvailableList;
