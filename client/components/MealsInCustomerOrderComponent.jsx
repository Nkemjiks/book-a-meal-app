import React, { Fragment } from 'react';

class MealsInCustomerOrderComponent extends React.Component {
  handleChange = (event) => {
    const num = Number(event.target.value);
    const price = Number(document.getElementById(`${event.target.id}price`).innerText.substr(2));
    this.props.getQuantity(event.target.id, num, price);
  }

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

export default MealsInCustomerOrderComponent;
