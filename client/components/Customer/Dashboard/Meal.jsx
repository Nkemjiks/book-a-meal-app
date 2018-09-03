import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * display the meals in the menu
 *
 * @class Meal
 *
 * @extends {Component}
 */
export class Meal extends React.Component {
  /**
   * add meal cart
   *
   * @param {Object} event
   *
   * @memberof Meal
   *
   * @returns {undefined} calls the addMealToCart method to update state
   */
  handleClick = (event) => {
    this.props.addMealToCart(event.target.id, this.props.meal.name, this.props.meal.price);
  }

  /**
   * renders component to DOM
   *
   * @memberof Meal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { meal } = this.props;
    const hours = new Date().getHours();
    return (
      <Fragment key={meal.mealId}>
        <div id="meal-info">
          <div>
            <img src={meal.imageURL} alt="Meal" className="meal-image" />
          </div>
          <p id={`${meal.mealId}name`} className="meal-name">
            <strong>{meal.name}</strong>
          </p>
          <div id="add-meal-div">
            <p id={`${meal.mealId}price`} className="meal-price">&#8358; {meal.price}</p>
            {
              (Number(hours) > 16) &&
              <i id={meal.mealId} className="fas fa-plus disabled" />
            }
            {
              (Number(hours) < 9) &&
              <i id={meal.mealId} className="fas fa-plus disabled" />
            }
            {
              (Number(hours) >= 9) && (Number(hours) <= 16) &&
              <i id={meal.mealId} className="fas fa-plus add-i" onClick={this.handleClick} />
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

Meal.propTypes = {
  addMealToCart: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
};

export default Meal;
