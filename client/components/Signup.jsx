import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../scss/signupComponent.scss';

import signupAction from '../action/signupAction';
import displayToast from '../helpers/displayToast';

/**
 * sign up a new user
 *
 * @class Signup
 *
 * @extends {Component}
 */
export class Signup extends React.Component {
  state = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
  };

  /**
   * updates component state when form values change
   *
   * @param {Object} event
   *
   * @memberof Signup
   *
   * @returns {undefined} updates state
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * form submission handler
   *
   * @param {Object} event
   *
   * @memberof Signup
   *
   * @returns {undefined} submits form
   */
  handleSubmit = (event) => {
    event.preventDefault();

    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
    } = this.state;

    const userDetails = {
      fullName,
      email,
      phoneNumber,
      password,
      address,
    };

    if (!fullName || !email || !phoneNumber || !password || !address) {
      return displayToast('error', 'Please provide all required fields');
    }

    this.props.signupAction(userDetails, this.props.history);
  }

  /**
   * renders component to DOM
   *
   * @memberof Signup
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    if (user) {
      /* istanbul ignore next */
      return <Redirect to="/customer/dashboard" />;
    }
    return (
      <div id="signup-component">
        <div id="signup-container">
          <h1>Sign Up Now</h1>
          <form>
            <input type="text" name="fullName" value={this.state.fullName} placeholder="Full Name" onChange={this.handleChange} />
            <input type="email" name="email" value={this.state.email} placeholder="Email Address" onChange={this.handleChange} />
            <input type="tel" name="phoneNumber" value={this.state.phoneNumber} placeholder="Phone Number" onChange={this.handleChange} />
            <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
            <input type="text" name="address" value={this.state.address} placeholder="Address" onChange={this.handleChange} />
            <button className="button" onClick={this.handleSubmit}>SIGN UP</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  signupAction,
};

Signup.propTypes = {
  signupAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapActionToProps)(Signup);
