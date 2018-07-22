import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../scss/loginComponent.scss';

import loginAction from '../action/loginAction';
import displayToast from '../helpers/displayToast';

/**
 * sign in an existing user
 *
 * @class Login
 *
 * @extends {Component}
 */
export class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  /**
   * updates component state when form values change
   *
   * @param {Object} event
   *
   * @memberof Login
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
   * @memberof Login
   *
   * @returns {undefined} submits form
   */
  handleSubmit = (event) => {
    event.preventDefault();

    const {
      email,
      password,
    } = this.state;

    if (!email || !password) {
      displayToast('error', 'Please provide all required fields');
    } else {
      const userDetails = {
        email,
        password,
      };

      this.props.loginAction(userDetails, this.props.history);
    }
  }

  /**
   * renders component to DOM
   *
   * @memberof Login
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    if (user) {
      /* istanbul ignore next */
      return <Redirect to="/customer/dashboard/0" />;
    }
    return (
      <div id="signin-component">
        <div id="signin-container">
          <h1>Sign in</h1>
          <form action="">
            <input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            <button className="button" onClick={this.handleSubmit}>SIGN IN</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  loginAction,
};

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapActionToProps)(Login);
