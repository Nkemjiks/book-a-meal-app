import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * view all orders and modify an order
 *
 * @class MealsInOrder
 *
 * @extends {Component}
 */
class MealsInOrder extends React.Component {
  /**
   * updates parent component state when input values changes
   *
   * @param {Object} event
   *
   * @memberof MealsInOrder
   *
   * @returns {undefined} call getQuantity method to update parent state
   */
  handleChange = (event) => {
    const num = Number(event.target.value);
    const price = Number(document.getElementById(`${event.target.id}price`).innerText.substr(2));
    this.props.getQuantity(event.target.id, num, price);
  }

  /**
   * renders component to DOM
   *
   * @memberof MealsInOrder
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { mealDetails } = this.props;
    return (
      mealDetails.map(meal => (
        <Fragment key={meal.id}>
          <div className="cart-order">
            <p className="cartdetails">{meal.name}</p>
            <p className="cartdetails" id={`${meal.id}price`}>&#8358; {meal.price}</p>
            <div>
              <input type="number" defaultValue={meal.orderItems.quantity} minLength="1" maxLength="20" id={meal.id} name="quatity" onChange={this.handleChange} />
            </div>
          </div>
        </Fragment>
      ))
    );
  }
}

MealsInOrder.propTypes = {
  getQuantity: PropTypes.func.isRequired,
  mealDetails: PropTypes.array.isRequired,
};

export default MealsInOrder;
