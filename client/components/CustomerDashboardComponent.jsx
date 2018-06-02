import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/customerComponent.scss';

import displayToast from '../helpers/displayToast';
import getUserDetailsAction from '../action/getUserDetailsAction';
import getAllMenuAction from '../action/getAllMenuAction';
import getAllMenuRequest from '../helpers/getAllMenuRequest';
import getToken from '../helpers/getToken';
import AllMenuComponent from './AllMenuComponent';
import CartComponent from './CartComponent';
import placeOrderAction from '../action/placeOrderAction';
import apiCall from '../helpers/axios';

class CustomerDashboardComponent extends React.Component {
  state = {
    allMenu: [],
    selectedMeal: [],
    order: [],
    mealDetails: [],
    total: 0,
    isAlreadyAdded: false,
    deliveryAddress: '',
  }

  componentWillMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.props.getUserDetailsAction(user);
    getAllMenuRequest(getToken(), this.props.getAllMenuAction);
  }

  componentWillReceiveProps({ allMenu }) {
    if (allMenu.length > 0) {
      this.setState({ allMenu });
    } else {
      this.setState({ allMenu: [] });
    }
  }

  getQuantity = (mealId, quantity, price) => {
    this.state.order.forEach((meal) => {
      if (meal.mealId === mealId) {
        const mealIndex = this.state.order.indexOf(meal);
        const newOrder = this.state.order;
        newOrder.splice(mealIndex, 1);
        const newMealDetails = this.state.mealDetails;
        newMealDetails.splice(mealIndex, 1);
        if (quantity === 0) {
          this.setState({
            order: [...newOrder, { mealId, quantity: 1 }],
            mealDetails: [...newMealDetails, { mealPrice: price, quantity: 1 }],
          });
        } else {
          this.setState({
            order: [...newOrder, { mealId, quantity }],
            mealDetails: [...newMealDetails, { mealPrice: price, quantity }],
          });
        }
      }
    });
    setTimeout(() => {
      this.getTotal();
    }, 200);
  }

  getTotal = () => {
    if (this.state.mealDetails.length > 0) {
      let total = 0;
      this.state.mealDetails.forEach((meal) => {
        total += (meal.mealPrice * meal.quantity);
      });
      this.setState({ total });
    } else {
      this.setState({ total: 0 });
    }
  }

  handleChange = (event) => {
    this.setState({
      deliveryAddress: event.target.value,
    });
  }

  addMealToCart = (mealId, mealName, mealPrice) => {
    this.state.selectedMeal.forEach((meal) => {
      if (meal.mealId === mealId) {
        this.setState({ isAlreadyAdded: true });
      }
    });
    setTimeout(() => {
      if (this.state.isAlreadyAdded === true) {
        this.setState({ isAlreadyAdded: false });
        return displayToast('error', 'The meal already exist in the cart');
      }
      this.setState({
        selectedMeal: [...this.state.selectedMeal, { mealId, mealName, mealPrice }],
        order: [...this.state.order, { mealId, quantity: 1 }],
        mealDetails: [...this.state.mealDetails, { mealPrice, quantity: 1 }],
      });
      setTimeout(() => {
        this.getTotal();
      }, 200);
    }, 100);
  }

  removeMealFromCart = (mealId) => {
    this.state.selectedMeal.forEach((meal) => {
      if (meal.mealId === mealId) {
        const mealIndex = this.state.selectedMeal.indexOf(meal);
        const newSelected = this.state.selectedMeal;
        newSelected.splice(mealIndex, 1);
        this.setState({
          selectedMeal: [...newSelected],
        });
      }
    });
    this.state.order.forEach((meal) => {
      if (meal.mealId === mealId) {
        const mealIndex = this.state.order.indexOf(meal);
        const newOrder = this.state.order;
        newOrder.splice(mealIndex, 1);
        const newMealDetails = this.state.mealDetails;
        newMealDetails.splice(mealIndex, 1);
        this.setState({
          order: [...newOrder],
          mealDetails: [...newMealDetails],
        });
      }
    });
    setTimeout(() => {
      this.getTotal();
    }, 200);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      order,
      deliveryAddress,
    } = this.state;

    const orderDetails = {
      meals: order,
      deliveryAddress,
    };

    // Add Order API call
    apiCall('/orders', 'post', orderDetails, getToken())
      .then(() => {
        this.props.placeOrderAction(true);
        displayToast('success', 'Order Placed Successfully');
      })
      .catch((err) => {
        this.props.placeOrderAction(false);
        return displayToast('error', err.response.data.message);
      });

    this.setState({
      order: [],
      mealDetails: [],
      total: 0,
      isAlreadyAdded: false,
      deliveryAddress: '',
      selectedMeal: [],
    });
  }

  render() {
    const { order } = this.state;
    const enabled = order.length > 0;
    return (
      <div>
        <div id="customer-dashboard-flex">
          <div id="menu">
            <h1>&#9832; Menu for Today &#9832;</h1>
            <p>Opening Hours: 9:00AM - 4:00PM</p>
            <div className="meal">
              {
              (this.state.allMenu.length !== 0) &&
              <AllMenuComponent allMenu={this.state.allMenu} addMealToCart={this.addMealToCart} />
              }
              {
              (this.state.allMenu.length === 0) && <p className="no-meal">No Menu Available yet</p>
              }
            </div>
          </div>
          <div id="cart">
            <h1>Cart</h1>
            <div className="cart-order description">
              <h4>Remove</h4>
              <h4>Meal name</h4>
              <h4>Meal Price</h4>
              <h4>Quantity</h4>
            </div>
            <div id="items">
              {
              (this.state.selectedMeal.length !== 0) &&
              <CartComponent
                selectedMeal={this.state.selectedMeal}
                getQuantity={this.getQuantity}
                removeMealFromCart={this.removeMealFromCart}
              />
              }
              {
              (this.state.selectedMeal.length === 0) && <p className="no-meal">You have not added any meal to your cart</p>
              }
            </div>
            <h3>Total:
              <span>&#8358; {this.state.total}</span>
            </h3>
            <input
              type="text"
              className="input"
              name="address"
              value={this.state.deliveryAddress}
              placeholder="Delivery Address"
              onChange={this.handleChange}
            />
            {
              enabled && <button id="enabledAddMealButton" className="button" onClick={this.handleSubmit} >Place Order</button>
            }
            {
              !enabled && <button id="disabledAddMealButton" className="button" disabled>Place Order</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  getUserDetailsAction,
  getAllMenuAction,
  placeOrderAction,
};

const mapStateToProps = ({ userInformation, getAllMenu, singleOrder }) => {
  const { user, error } = userInformation;
  const { allMenu } = getAllMenu;
  const { isOrderPlaced } = singleOrder;
  return {
    user,
    error,
    allMenu,
    isOrderPlaced,
  };
};

CustomerDashboardComponent.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  placeOrderAction: PropTypes.func.isRequired,
  getAllMenuAction: PropTypes.func.isRequired,
  allMenu: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CustomerDashboardComponent);
