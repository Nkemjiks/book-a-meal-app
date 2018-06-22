import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import '../../../scss/catererManageOrderComponent.scss';

import getUserDetailsAction from '../../../action/getUserDetailsAction';
import refreshTokenRequest from '../../../helpers/refreshTokenRequest';
import getCustomerOrderHistoryAction from '../../../action/getCustomerOrderHistoryAction';
import OrderHistoryList from './OrderHistoryList';

/**
 * view all orders and modify an order
 *
 * @class ManageOrder
 *
 * @extends {Component}
 */
export class ManageOrder extends React.Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof ManageOrder
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps({ customerOrderHistory }, state) {
    if (customerOrderHistory !== state.customerOrderHistory) {
      return {
        customerOrderHistory,
      };
    }
    return null;
  }

  state = {
    customerOrderHistory: {},
  }

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof ManageOrder
   *
   * @returns {object} updates the user and customer's order information in the redux store
   */
  componentDidMount() {
    refreshTokenRequest(this.props.history);
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
    this.props.getCustomerOrderHistoryAction();
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
        <div id="caterer-dashboard-flex">
          <div id="incoming-orders" className="detailed-orders">
            <h1>Order History</h1>
            <div className="order-info description">
              <h4>Order Id</h4>
              <h4>Date</h4>
              <h4>Time</h4>
              <h4>Total</h4>
              <h4>Modify</h4>
            </div>
            <div className="orders-placed">
              {
                (this.state.customerOrderHistory.data) &&
                <OrderHistoryList
                  orderDetails={this.state.customerOrderHistory.data.data}
                />
              }
              {
                (!this.state.customerOrderHistory.data) &&
                <p className="message">You have not placed any order yet</p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ customerOrder }) => {
  const { customerOrderHistory, orderModified } = customerOrder;
  return {
    customerOrderHistory,
    orderModified,
  };
};

const mapActionToProps = {
  getUserDetailsAction,
  getCustomerOrderHistoryAction,
};

ManageOrder.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getCustomerOrderHistoryAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  orderModified: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(ManageOrder));
