import React, { Fragment } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/modal.scss';

import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';
import displayToast from '../helpers/displayToast';

Modal.setAppElement('#app');

class CustomerOrderHistoryComponent extends React.Component {
  state = {
    modifyModalIsOpen: false,
    total: 0,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  openEditModal = () => {
    this.setState({
      modifyModalIsOpen: true,
    });
  }

  closeEditModal = () => {
    this.setState({ modifyModalIsOpen: false });
  }

  render() {
    const { order } = this.props;
    return (
      <Fragment>
        <Modal
          isOpen={this.state.modifyModalIsOpen}
          onRequestClose={this.closeEditModal}
          className="EditModal"
          overlayClassName="Overlay"
        >
          <h1>Modify Meal</h1>
          <p>Just testing</p>
        </Modal>
        <div>
          <div key={order.id} className="order-info">
            <p>{order.id}</p>
            <p>{order.date}</p>
            <p>{order.time}</p>
            <p>{this.state.total}</p>
          </div>
          {
            order.meals.map((meal) => {
              return (
                <Fragment key={meal.id}>
                  <p>Meal: {meal.name} - Quanity: {meal.orderItems.quantity} - Cost: {meal.orderItems.quantity * meal.price}</p>
                </Fragment>
              );
            })
          }
          <div id="modify-div">
            <i id={order.id} onClick={this.openEditModal} className="far fa-edit" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CustomerOrderHistoryComponent;
