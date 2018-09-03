import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * view and modify a meal in an order
 *
 * @class Meal
 *
 * @extends {Component}
 */
export class Meal extends React.Component {
  /**
   * updates parent component state when input values changes
   *
   * @param {Object} event
   *
   * @memberof Meals
   *
   * @returns {undefined} call getQuantity method to update parent state
   */
  handleChange = (event) => {
    const num = Number(event.target.value);
    this.props.getQuantity(event.target.id, num, this.props.meal.price);
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
    return (
      <Fragment key={meal.id}>
        <div className="cart-order">
          <p className="cartdetails">{meal.name}</p>
          <p className="cartdetails" id={`${meal.id}price`}>&#8358; {meal.price}</p>
          <div>
            <input type="number" defaultValue={meal.quantity} minLength="1" maxLength="20" id={meal.id} name="quatity" onChange={this.handleChange} />
          </div>
        </div>
      </Fragment>
    );
  }
}

Meal.propTypes = {
  getQuantity: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
};

export default Meal;
