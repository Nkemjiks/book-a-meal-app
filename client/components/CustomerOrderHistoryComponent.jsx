import React, { Fragment } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/modal.scss';

import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';
import displayToast from '../helpers/displayToast';
import MealsInCustomerOrderComponent from './MealsInCustomerOrderComponent';
import modifyOrderAction from '../action/modifyOrderAction';
import getCustomerOrderHistoryAction from '../action/getCustomerOrderHistoryAction';
import getCustomerOrderHistoryRequest from '../helpers/getCustomerOrderHistoryRequest';

Modal.setAppElement('#app');

class CustomerOrderHistoryComponent extends React.Component {
  state = {
    modifyModalIsOpen: false,
    orderInformation: {},
    mealsInOrder: [],
    deliveryAddress: '',
    orderId: '',
    total: 0,
    orders: [],
    originalOrder: [],
  };

  getTotal = () => {
    if (this.state.mealsInOrder.length > 0) {
      let total = 0;
      this.state.mealsInOrder.forEach((meal) => {
        total += (meal.mealPrice * meal.quantity);
      });
      this.setState({ total });
    } else {
      this.setState({ total: 0 });
    }
  }

  getQuantity = (mealId, quantity, price) => {
    this.state.orders.forEach((meal) => {
      if (meal.mealId === mealId) {
        const mealIndex = this.state.orders.indexOf(meal);
        const newOrder = this.state.orders;
        newOrder.splice(mealIndex, 1);
        const newMealDetails = this.state.mealsInOrder;
        newMealDetails.splice(mealIndex, 1);
        if (quantity === 0) {
          this.setState({
            orders: [...newOrder, { mealId, quantity: 1 }],
            mealsInOrder: [...newMealDetails, { mealPrice: price, quantity: 1 }],
          });
        } else {
          this.setState({
            orders: [...newOrder, { mealId, quantity }],
            mealsInOrder: [...newMealDetails, { mealPrice: price, quantity }],
          });
        }
      }
    });
    setTimeout(() => {
      this.getTotal();
    }, 200);
  }

  openEditModal = (event) => {
    const orders = [];
    const mealsInOrder = [];
    this.props.order.meals.forEach((meal) => {
      const mealId = meal.id;
      const mealPrice = meal.price;
      const { quantity } = meal.orderItems;
      orders.push({ mealId, quantity });
      mealsInOrder.push({ mealPrice, quantity });
    });
    this.setState({
      modifyModalIsOpen: true,
      orderInformation: this.props.order,
      mealsInOrder,
      orderId: event.target.id,
      orders,
      originalOrder: orders,
      deliveryAddress: this.props.order.deliveryAddress,
    });
    setTimeout(() => {
      this.getTotal();
    }, 200);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  closeEditModal = () => {
    this.setState({ modifyModalIsOpen: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      orders,
      originalOrder,
      deliveryAddress,
      orderId,
    } = this.state;

    const stringOrder = JSON.stringify(orders.sort());
    const stringOriginalOrder = JSON.stringify(originalOrder.sort());

    if (stringOrder === stringOriginalOrder) {
      return displayToast('error', 'You have not made any changes');
    }

    const orderDetails = {
      meals: orders,
      deliveryAddress,
    };

    apiCall(`/orders/${orderId}`, 'put', orderDetails, getToken())
      .then(() => {
        this.props.modifyOrderAction(true);
        getCustomerOrderHistoryRequest(getToken(), this.props.getCustomerOrderHistoryAction);
        displayToast('success', 'Order Modified Successfully');
      })
      .catch((err) => {
        this.props.modifyOrderAction(false);
        return displayToast('error', err.response.data.message);
      });

    this.setState({
      mealsInOrder: [],
      deliveryAddress: '',
      orderId: '',
      total: 0,
    });

    this.closeEditModal();
  }

  render() {
    const { order } = this.props;
    let subTotal = 0;
    return (
      <Fragment>
        <Modal
          isOpen={this.state.modifyModalIsOpen}
          onRequestClose={this.closeEditModal}
          className="ModifyModal"
          overlayClassName="Overlay"
        >
          <div>
            <h1>Modify Order</h1>
            <div className="cart-order description">
              <h4>Meal name</h4>
              <h4>Meal Price</h4>
              <h4>Quantity</h4>
            </div>
            <div id="items">
              {
                (this.state.orderInformation.meals) &&
                <MealsInCustomerOrderComponent
                  mealDetails={this.state.orderInformation.meals}
                  getQuantity={this.getQuantity}
                />
              }
              {
                (!this.state.orderInformation.meals) &&
                <p>Loading</p>
              }
            </div>
            <input
              type="text"
              className="input"
              name="address"
              defaultValue={this.state.deliveryAddress}
              placeholder="Delivery Address"
              onChange={this.handleChange}
            />
            <h3>Total:
              <span>&#8358; {this.state.total}</span>
            </h3>
            <button id="enabledAddMealButton" className="button" onClick={this.handleSubmit} >Modify Order</button>
          </div>
        </Modal>
        <div className="orderHistory">
          <div key={order.id} className="order-info">
            <p>{order.id}</p>
            <p>{order.date}</p>
            <p>{order.time}</p>
            {
              this.props.order.meals.map((meal) => {
                subTotal += (meal.orderItems.quantity * meal.price);
                return null;
              })
            }
            <p>&#8358; {subTotal}</p>
            <div id="modify-div">
              <i id={order.id} onClick={this.openEditModal} className="far fa-edit" />
            </div>
          </div>
          <hr />
          {
            order.meals.map(meal => (
              <Fragment key={meal.id}>
                <p><strong>{meal.name}</strong> - {meal.orderItems.quantity} plates</p>
              </Fragment>
            ))
          }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ singleOrder }) => {
  const { isOrderModified } = singleOrder;
  return {
    isOrderModified,
  };
};

const mapActionToProps = {
  modifyOrderAction,
  getCustomerOrderHistoryAction,
};

CustomerOrderHistoryComponent.propTypes = {
  modifyOrderAction: PropTypes.func.isRequired,
  getCustomerOrderHistoryAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CustomerOrderHistoryComponent);
