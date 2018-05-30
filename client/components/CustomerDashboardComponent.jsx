import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/customerComponent.scss';

import getUserDetailsAction from '../action/getUserDetailsAction';
import getAllMenuAction from '../action/getAllMenuAction';
import getAllMenuRequest from '../helpers/getAllMenuRequest';
import getToken from '../helpers/getToken';
import AllMenuComponent from './AllMenuComponent';

class CustomerDashboardComponent extends React.Component {
  state = {
    allMenu: [],
    selectedMeal: [],
    order: [],
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

  addMealToCart = (mealId, mealName, mealPrice) => {
    this.setState({ selectedMeal: [...this.state.selectedMeal, [mealId, mealName, mealPrice]] });
  }

  render() {
    return (
      <div>
        <div id="customer-dashboard-flex">
          <div id="menu">
            <h1>&#9832; Menu for Today &#9832;</h1>
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
              <h4>Meal name</h4>
              <h4>Meal Price</h4>
              <h4>Quantity</h4>
            </div>
            <div id="items">
              <div className="cart-order">
              {this.state.selectedMeal}
                {/* <p>Coconut rice</p>
                <p>&#8358; 300</p>
                <div>
                  <input type="number" value="1" minLength="1" maxLength="10" name="quatity" id="" />
                </div> */}
              </div>
            </div>
            <h2>Total:
              <span>&#8358; 3000</span>
            </h2>
            <button id="order">Place Order</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  getUserDetailsAction,
  getAllMenuAction,
};

const mapStateToProps = ({ userInformation, getAllMenu }) => {
  const { user, error } = userInformation;
  const { allMenu } = getAllMenu;
  return {
    user,
    error,
    allMenu,
  };
};

CustomerDashboardComponent.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CustomerDashboardComponent);
