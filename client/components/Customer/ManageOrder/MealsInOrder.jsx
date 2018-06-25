import React, { Fragment } from 'react';
import Meal from './Meal';

/**
 * view meals in an order
 *
 * @param {object} mealDetails details of all the meals in an order
 * @param {Function} getQuantity get quantity of meal and update state
 *
 * @returns {JSX} JSX representation of component
 */
const MealsInOrder = ({ mealDetails, getQuantity }) => (
  mealDetails.map(meal => (
    <Fragment key={meal.id}>
      <Meal meal={meal} getQuantity={getQuantity} />
    </Fragment>
  ))
);

export default MealsInOrder;
