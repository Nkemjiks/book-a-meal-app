import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * display the shopping cart
 *
 * @class CartContent
 *
 * @extends {Component}
 */
class CartContent extends React.Component {
  /**
   * update meal quantity
   *
   * @param {Object} event
   *
   * @memberof CartContent
   *
   * @returns {undefined} calls the getQuantity method to updates state
   */
  handleChange = (event) => {
    const num = Number(event.target.value);
    this.props.getQuantity(event.target.id, num, this.props.meal.mealPrice);
  }

  /**
   * remove meal from cart
   *
   * @param {Object} event
   *
   * @memberof CartContent
   *
   * @returns {undefined} calls the removeMealFromCart method to updates state
   */
  handleRemove = (event) => {
    this.props.removeMealFromCart(event.target.id);
  }

  /**
   * renders component to DOM
   *
   * @memberof CartContent
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { meal } = this.props;
    return (
      <Fragment>
        <div className="cart-order">
          <i id={meal.mealId} onClick={this.handleRemove} className="fas fa-times" />
          <p className="cartdetails">{meal.mealName}</p>
          <p className="cartdetails" id={`${meal.mealId}price`}>&#8358;{meal.mealPrice}</p>
          <div>
            <input type="number" defaultValue="1" minLength="1" maxLength="20" id={meal.mealId} name="quatity" onChange={this.handleChange} />
          </div>
        </div>
      </Fragment>
    );
  }
}

CartContent.propTypes = {
  getQuantity: PropTypes.func.isRequired,
  removeMealFromCart: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
};

export default CartContent;
