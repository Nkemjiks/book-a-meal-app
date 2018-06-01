import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import '../scss/catererManageOrderComponent.scss';

import getUserDetailsAction from '../action/getUserDetailsAction';
import getCatererOrderAction from '../action/getCatererOrderAction';
import getCatererOrderRequest from '../helpers/getCatererOrderRequest';
import getAllCatererOrderAction from '../action/getAllCatererOrderAction';
import getAllCatererOrderRequest from '../helpers/getAllCatererOrderRequest';
import TodayCatererOrderComponent from './TodayCatererOrderComponent';
import AllCatererOrderComponent from './AllCatererOrderComponent';
import getToken from '../helpers/getToken';

class CatererManageOrderComponent extends React.Component {
  state = {
    orders: {},
    allOrders: {},
    todayTotalOrders: 0,
    totalOrders: 0,
    todayTotalSales: 0,
    totalSales: 0,
  }

  componentWillMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.props.getUserDetailsAction(user);
    getCatererOrderRequest(getToken(), this.props.getCatererOrderAction);
    getAllCatererOrderRequest(getToken(), this.props.getAllCatererOrderAction);
  }

  componentDidMount() {
    const time = new Date().getHours();
    if ((Number(time) >= 9) && (Number(time) < 16)) {
      this.refreshInterval = setInterval(() => {
        getCatererOrderRequest(getToken(), this.props.getCatererOrderAction);
        getAllCatererOrderRequest(getToken(), this.props.getAllCatererOrderAction);
      }, 300000);
    } else {
      clearInterval(this.refreshInterval);
    }
  }

  componentWillReceiveProps({ orders, allOrders }) {
    if (orders.data) {
      this.setState({
        orders,
        todayTotalOrders: orders.data.data.length,
        todayTotalSales: orders.data.totalSales,
      });
    } else {
      this.setState({
        orders: {},
        todayTotalOrders: 0,
        todayTotalSales: 0,
      });
    }
    if (allOrders.data) {
      this.setState({
        allOrders,
        totalOrders: allOrders.data.data.length,
        totalSales: allOrders.data.totalSales,
      });
    } else {
      this.setState({
        allOrders: {},
        totalOrders: 0,
        totalSales: 0,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="dashboard">
        <div id="caterer-dashboard-flex">
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
                <TodayCatererOrderComponent orderDetails={this.state.orders.data.data} />
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
                <AllCatererOrderComponent orderDetails={this.state.allOrders.data.data} />
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
const mapStateToProps = ({ getCatererOrder, getAllCatererOrder  }) => {
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

CatererManageOrderComponent.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getCatererOrderAction: PropTypes.func.isRequired,
  getAllCatererOrderAction: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
  allOrders: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CatererManageOrderComponent);
