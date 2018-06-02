import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import '../scss/catererManageOrderComponent.scss';

import getUserDetailsAction from '../action/getUserDetailsAction';
import getCustomerOrderHistoryAction from '../action/getCustomerOrderHistoryAction';
import getCustomerOrderHistoryRequest from '../helpers/getCustomerOrderHistoryRequest';
import CustomerOrderHistoryListComponent from './CustomerOrderHistoryListComponent';
import getToken from '../helpers/getToken';

class CustomerManageOrderComponent extends React.Component {
  state = {
    customerOrderHistory: {},
  }

  componentWillMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.props.getUserDetailsAction(user);
    getCustomerOrderHistoryRequest(getToken(), this.props.getCustomerOrderHistoryAction);
  }

  componentWillReceiveProps({ customerOrderHistory }) {
    if (customerOrderHistory.data) {
      this.setState({
        customerOrderHistory,
      });
    } else {
      this.setState({
        customerOrderHistory: {},
      });
    }
  }

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
                <CustomerOrderHistoryListComponent orderDetails={this.state.customerOrderHistory.data.data} />
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
const mapStateToProps = ({ getCustomerOrderHistory  }) => {
  const { customerOrderHistory } = getCustomerOrderHistory;
  return {
    customerOrderHistory,
  };
};

const mapActionToProps = {
  getUserDetailsAction,
  getCustomerOrderHistoryAction,
};

CustomerManageOrderComponent.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getCustomerOrderHistoryAction: PropTypes.func.isRequired,
  customerOrderHistory: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CustomerManageOrderComponent);
