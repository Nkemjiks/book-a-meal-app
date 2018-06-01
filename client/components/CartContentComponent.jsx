import React, { Fragment } from 'react';

class CartContentComponent extends React.Component {
  handleChange = (event) => {
    const num = Number(event.target.value);
    const price = Number(document.getElementById(`${event.target.id}price`).innerText.substr(2));
    this.props.getQuantity(event.target.id, num, price);
  }

  handleRemove = (event) => {
    this.props.removeMealFromCart(event.target.id);
  }
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

export default CartContentComponent;
