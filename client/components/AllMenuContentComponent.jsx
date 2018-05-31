import React, { Fragment } from 'react';

class AllMenuContentComponent extends React.Component {
  handleClick = (event) => {
    const mealName = document.getElementById(`${event.target.id}name`).innerText;
    const mealPrice = Number(document.getElementById(`${event.target.id}price`).innerText.substr(2));
    this.props.addMealToCart(event.target.id, mealName, mealPrice);
  }

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
                (Number(hours) < 9) &&
                <i id={meal.menuItems.mealId} className="fas fa-plus add-i disabled" />
              }
              {
                (Number(hours) >= 9) && (Number(hours) <= 16) &&
                <i id={meal.menuItems.mealId} className="fas fa-plus add-i" onClick={this.handleClick} />
              }
              
            </div>
          </div>
        </Fragment>
      ))
    );
  }
}

export default AllMenuContentComponent;
