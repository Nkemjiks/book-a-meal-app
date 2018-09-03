import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * view caterer's meals
 *
 * @class MealAvailable
 *
 * @extends {Component}
 */
export class MealsAvailable extends React.Component {
  /**
   * add meal to menu
   *
   * @param {Object} event
   *
   * @memberof MealAvailable
   *
   * @returns {undefined} calls the addMealIdToArray method to update state
   */
  handleClick = (event) => {
    this.props.addMealIdToArray(event.target.id, event.target.checked);
  }

  /**
   * renders component to DOM
   *
   * @memberof MealAvailable
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { meal, mealsInMenuId } = this.props;
    return (
      <Fragment>
        <div key={meal.id} className="meals-added meal-avaliable">
          <div>
            <img src={meal.imageURL} alt="Meal" className="meal-image" />
          </div>
          <p id={`${meal.id}name`}>{meal.name}</p>
          <p id={`${meal.id}price`}>&#8358; {meal.price}</p>
          <div id="checkdiv">
            {
              (mealsInMenuId.indexOf(meal.id) > -1) &&
              <input id={meal.id} type="checkbox" name="add" defaultChecked />
            }
            {
              (mealsInMenuId.indexOf(meal.id) === -1) &&
              <input id={meal.id} type="checkbox" name="add" onClick={this.handleClick} />
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

MealsAvailable.propTypes = {
  addMealIdToArray: PropTypes.func.isRequired,
  mealsInMenuId: PropTypes.array.isRequired,
  meal: PropTypes.object.isRequired,
};

export default MealsAvailable;
