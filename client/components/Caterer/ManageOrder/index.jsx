import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import getUserDetailsAction from '../../../action/getUserDetailsAction';
import getCatererOrderAction from '../../../action/getCatererOrderAction';
import getAllCatererOrderAction from '../../../action/getAllCatererOrderAction';
import refreshTokenRequest from '../../../helpers/refreshTokenRequest';
import ManageOrderContent from './ManageOrderContent';

/**
 * view all orders coming in and order history
 *
 * @class ManageOrder
 *
 * @extends {Component}
 */
class ManageOrder extends React.Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof ManageOrder
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps({ orders, allOrders }) {
    if (orders.data && allOrders.data) {
      return {
        orders,
        todayTotalOrders: orders.data.data.length,
        todayTotalSales: orders.data.totalSales,
        allOrders,
        totalOrders: allOrders.data.data.length,
        totalSales: allOrders.data.totalSales,
      };
    }
    if (allOrders.data) {
      return {
        allOrders,
        totalOrders: allOrders.data.data.length,
        totalSales: allOrders.data.totalSales,
      };
    }
    return null;
  }

  state = {
    orders: {},
    allOrders: {},
    todayTotalOrders: 0,
    totalOrders: 0,
    todayTotalSales: 0,
    totalSales: 0,
  }

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof ManageOrder
   *
   * @returns {object} updates the user and caterer's orders information in the redux store
   */
  componentDidMount() {
    refreshTokenRequest(this.props.history);
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
    this.props.getCatererOrderAction();
    this.props.getAllCatererOrderAction();
    const time = new Date().getHours();
    if ((Number(time) >= 9) && (Number(time) < 16)) {
      this.refreshInterval = setInterval(() => {
        this.props.getCatererOrderAction();
        this.props.getAllCatererOrderAction();
      }, 300000);
    } else {
      clearInterval(this.refreshInterval);
    }
  }

  /**
   * lifecycle methods called immediately after a component is unmounted
   *
   * @memberof ManageOrder
   *
   * @returns {object} clear the time interval
   */
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  /**
   * renders component to DOM
   *
   * @memberof ManageOrder
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div className="dashboard">
        <div id="caterer-dashboard-flez">
          <div id="order-summary-general">
            <div className="order-summary">
              <h3>Today Order Summary</h3>
              <p>Number of Orders Received: {this.state.todayTotalOrders}</p>
              <p>Total Amount Made: &#8358; {this.state.todayTotalSales}</p>
            </div>
            <div className="order-summary">
              <h3>All Order Summary</h3>
              <p>Number of Orders Received: {this.state.totalOrders}</p>
              <p>Total Amount Made: &#8358; {this.state.totalSales}</p>
            </div>
          </div>
          <div id="incoming-orders">
            <h1>Incoming Orders</h1>
            <div className="order-info description">
              <h4>Customer</h4>
              <h4>Phone Number</h4>
              <h4>Email Address</h4>
              <h4>Meal name</h4>
              <h4>Quantity</h4>
              <h4>Order Id</h4>
              <h4>Address</h4>
            </div>
            <div className="orders-placed">
              {
                (this.state.orders.data) &&
                <ManageOrderContent
                  orderDetails={this.state.orders.data.data}
                  isToday
                />
              }
              {
                (!this.state.orders.data) &&
                <p className="message">You do not have any order yet</p>
              }
            </div>
          </div>
          <div id="incoming-orders" className="detailed-orders">
            <h1>Details of All Order</h1>
            <div className="order-info description">
              <h4>Date</h4>
              <h4>Time</h4>
              <h4>Customer</h4>
              <h4>Phone Number</h4>
              <h4>Email Address</h4>
              <h4>Meal name</h4>
              <h4>Quantity</h4>
              <h4>Order Id</h4>
              <h4>Address</h4>
            </div>
            <div className="orders-placed">
              {
                (this.state.allOrders.data) &&
                <ManageOrderContent
                  orderDetails={this.state.allOrders.data.data}
                  isToday={false}
                />
              }
              {
                (!this.state.allOrders.data) &&
                <p className="message">You do not have any order yet</p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ getCatererOrder, getAllCatererOrder }) => {
  const { orders } = getCatererOrder;
  const { allOrders } = getAllCatererOrder;
  return {
    orders,
    allOrders,
  };
};

const mapActionToProps = {
  getUserDetailsAction,
  getCatererOrderAction,
  getAllCatererOrderAction,
};

ManageOrder.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getCatererOrderAction: PropTypes.func.isRequired,
  getAllCatererOrderAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(ManageOrder));
