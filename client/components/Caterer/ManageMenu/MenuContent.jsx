import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * display meal set by the caterer
 *
 * @param {array} meal details of meal
 *
 * @returns {JSX} JSX representation of component
 */
const MenuContent = ({ meal }) => (
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

MenuContent.propTypes = {
  meal: PropTypes.object.isRequired,
};

export default MenuContent;
