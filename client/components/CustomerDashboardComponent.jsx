import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../scss/customerComponent.scss';
import getUserDetailsAction from '../action/getUserDetailsAction';

class CustomerDashboardComponent extends React.Component {
  componentWillMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.props.getUserDetailsAction(user);
  }
  render() {
    return (
      <div>
        <div id="customer-dashboard-flex">
          <div id="menu">
            <h1>&#9832; Menu for Today &#9832;</h1>
            <div className="meal">
              <div id="meal-info">
                <h3 id="meal-name">
                  <strong>Coconut rice</strong>
                </h3>
                <p id="meal-price">&#8358; 300</p>
                <div id="add-meal-div">
                  <img src="../../image/remove.png" className="remove" alt="add/remove meal" />
                </div>
              </div>
              <div id="meal-info">
                <h3 id="meal-name">
                  <strong>Coconut rice</strong>
                </h3>
                <p id="meal-price">&#8358; 300</p>
                <div id="add-meal-div">
                  <img src="../../image/add.png" alt="add/remove meal" id="add-meal" />
                </div>
              </div>
              <div id="meal-info">
                <h3 id="meal-name">
                  <strong>Coconut rice</strong>
                </h3>
                <p id="meal-price">&#8358; 300</p>
                <div id="add-meal-div">
                  <img src="../../image/add.png" alt="add/remove meal" id="add-meal" />
                </div>
              </div>
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
                <p>Coconut rice</p>
                <p>&#8358; 300</p>
                <div>
                  <input type="number" value="1" minLength="1" maxLength="10" name="quatity" id="" />
                </div>
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
};

const mapStateToProps = ({ userInformation }) => {
  const { user, error } = userInformation;
  return {
    user,
    error,
  };
};

CustomerDashboardComponent.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CustomerDashboardComponent);
