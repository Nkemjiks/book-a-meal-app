import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * display the meals in the menu
 *
 * @class MenuContent
 *
 * @extends {Component}
 */
class MenuContent extends React.Component {
  /**
   * add meal cart
   *
   * @param {Object} event
   *
   * @memberof MenuContent
   *
   * @returns {undefined} calls the addMealToCart method to update state
   */
  handleClick = (event) => {
    const mealName = document.getElementById(`${event.target.id}name`).innerText;
    const mealPrice = Number(document.getElementById(`${event.target.id}price`).innerText.substr(2));
    this.props.addMealToCart(event.target.id, mealName, mealPrice);
  }

  /**
   * renders component to DOM
   *
   * @memberof MenuContent
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { meals } = this.props;
    const hours = new Date().getHours();
    return (
      meals.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()).map(meal => (
        <Fragment key={meal.menuItems.mealId}>
          <div id="meal-info">
            <div>
              <img src={meal.imageURL} alt="Meal" className="meal-image" />
            </div>
            <h4 id={`${meal.menuItems.mealId}name`} className="meal-name">
              <strong>{meal.name}</strong>
            </h4>
            <p id={`${meal.menuItems.mealId}price`} className="meal-price">&#8358; {meal.price}</p>
            <div id="add-meal-div">
              {
                (Number(hours) > 16) &&
                <i id={meal.menuItems.mealId} className="fas fa-plus add-i disabled" />
              }
              {
                (Number(hours) < 5) &&
                <i id={meal.menuItems.mealId} className="fas fa-plus add-i disabled" />
              }
              {
                (Number(hours) > 5) && (Number(hours) <= 16) &&
                <i id={meal.menuItems.mealId} className="fas fa-plus add-i" onClick={this.handleClick} />
              }
            </div>
          </div>
        </Fragment>
      ))
    );
  }
}

MenuContent.propTypes = {
  addMealToCart: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
};

export default MenuContent;
