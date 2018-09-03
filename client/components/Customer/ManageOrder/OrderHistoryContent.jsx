import React, { Fragment } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../../scss/modal.scss';

import displayToast from '../../../helpers/displayToast';
import MealsInOrder from './MealsInOrder';
import modifyOrderAction from '../../../action/modifyOrderAction';

/**
 * display one customer order
 *
 * @class OrderHistoryContent
 *
 * @extends {Component}
 */
export class OrderHistoryContent extends React.Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof OrderHistoryContent
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps({ orderModified }) {
    if (orderModified) {
      return {
        modifyModalIsOpen: false,
        mealsInOrder: [],
        deliveryAddress: '',
        orderId: '',
        total: 0,
      };
    }
    return null;
  }
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

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof OrderHistoryContent
   *
   * @returns {object} mounts modal on root element
   */
  componentDidMount() {
    Modal.setAppElement('#app');
  }

  /**
   * method called in other methods to update state
   *
   * @memberof OrderHistoryContent
   *
   * @return {undefined} sets state
   */
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

  /**
   * method called to update state
   *
   * @param  {string} mealId meal id
   * @param  {integer} quantity meal quantity
   * @param  {integer} price meal price
   *
   * @memberof OrderHistoryContent
   *
   * @return {undefined} sets state and call getTotal method
   */
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

  /**
   * method called to open modal
   *
   * @param  {event} event
   *
   * @memberof OrderHistoryContent
   *
   * @return {undefined} sets state and call getTotal method
   */
  openEditModal = (event) => {
    const orders = [];
    const mealsInOrder = [];
    this.props.order.meals.forEach((meal) => {
      const mealId = meal.id;
      const mealPrice = meal.price;
      const { quantity } = meal;
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

  /**
   * handle input change
   *
   * @param {Object} event
   *
   * @memberof OrderHistoryContent
   *
   * @returns {undefined} update state with input change
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * method called to close modal
   *
   * @memberof OrderHistoryContent
   *
   * @return {undefined} sets state
   */
  closeEditModal = () => {
    this.setState({ modifyModalIsOpen: false });
  }

  /**
   * modify an order
   *
   * @param {Object} event
   *
   * @memberof OrderHistoryContent
   *
   * @returns {undefined} call action to modify the order
   */
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
    this.props.modifyOrderAction(orderId, orderDetails);
  }

  /**
   * renders component to DOM
   *
   * @memberof OrderHistoryContent
   *
   * @returns {JSX} JSX representation of component
   */
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
                <MealsInOrder
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
              name="deliveryAddress"
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
        <div className="orderHistory" id="orderHistory">
          <table>
            <tbody>
              <tr>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.time}</td>
                {
                  this.props.order.meals.map((meal) => {
                    subTotal += (meal.quantity * meal.price);
                    return null;
                  })
                }
                <td>&#8358; {subTotal}</td>
                <td>
                  {
                    ((((Date.now() - new Date(order.createdAt).getTime()) / 1000) / 60) < 60) &&
                    <div id="modify-div">
                      <i id={order.id} onClick={this.openEditModal} className="far fa-edit" />
                    </div>
                  }
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          {
            order.meals.map(meal => (
              <Fragment key={meal.id}>
                <p><strong>{meal.name}</strong> - {meal.quantity} plate(s)</p>
              </Fragment>
            ))
          }
        </div>
      </Fragment>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = ({ customerOrder }) => {
  const { orderModified } = customerOrder;
  return {
    orderModified,
  };
};

const mapActionToProps = {
  modifyOrderAction,
};

OrderHistoryContent.propTypes = {
  modifyOrderAction: PropTypes.func.isRequired,
  order: PropTypes.shape({
    meals: PropTypes.array.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(OrderHistoryContent);
