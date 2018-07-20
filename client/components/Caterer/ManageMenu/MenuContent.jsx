import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * display the shopping cart
 *
 * @class MenuContent
 *
 * @extends {Component}
 */
export class MenuContent extends React.Component {
  /**
   * remove meal from menu
   *
   * @param {Object} event
   *
   * @memberof MenuContent
   *
   * @returns {undefined} calls the removeMealFromMenu method to updates state
   */
  handleRemove = (event) => {
    this.props.removeMealFromMenu(event.target.id);
  }

  /**
   * renders component to DOM
   *
   * @memberof MenuContent
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { meal } = this.props;
    return (
      <Fragment>
        <div className="meals-added">
          <div>
            <img src={meal.imageURL} alt="Meal" className="meal-image" />
          </div>
          <p id={`${meal.menuItems.mealId}name`}>{meal.name}</p>
          <p id={`${meal.menuItems.mealId}price`}>&#8358; {meal.price}</p>
          <i id={meal.menuItems.mealId} onClick={this.handleRemove} className="fa fa-times remove-meal" aria-hidden="true" />
        </div>
      </Fragment>
    );
  }
}

MenuContent.propTypes = {
  removeMealFromMenu: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
};

export default MenuContent;

